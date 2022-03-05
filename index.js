require('dotenv').config();
const { exec } = require('child_process');
const puppeteer = require('puppeteer');
const completeOneDay = require('./commands/completeOneDay');
const { delay } = require('./utils');

const openImage = path => new Promise((resolve, reject) => {
  exec(`open ${path}`, (error, _stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return reject(`error: ${error.message}`);
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return reject(`stderr: ${stderr}`);
    }
    return resolve();
  });
});

const [command, project, message, hourArg] = process.argv.slice(2);

(async () => {
  if (!command) {
    console.error('Command is required');
    process.exit(1);
  }
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(process.env.TRACKING_APP);
  await page.type('#UserName', process.env.USER_EMAIL);
  await page.type('#Password', process.env.USER_PASSWORD);
  await page.click('#submit-btn');
  // last week item
  const lastWeekItem = '#TimesheetsGrid > table > tbody > tr:nth-child(1) > td:nth-child(7) > a';
  await page.waitForSelector(lastWeekItem)
  await page.click(lastWeekItem);
  await delay(2000);

  // complete one day
  const today = new Date();
  const hours = hourArg || 8;
  // get all the currently open pages as an array
  const pages = await browser.pages();
  const newPage = pages[pages.length - 1];
  await completeOneDay(newPage, today, project, message, hours);
  await delay(1000);
  await newPage.screenshot({
    path: 'screenshots/example.png',
    fullPage: true
  });
  await browser.close();
  await openImage('screenshots/example.png');
})();
