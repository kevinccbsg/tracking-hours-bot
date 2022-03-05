require('dotenv').config();
const puppeteer = require('puppeteer');
const completeOneDay = require('./commands/completeOneDay');
const fullWeek = require('./commands/week');
const { delay, getMonday, openImage } = require('./utils');
const { TODAY_COMMAND, FULL_WEEK, AVAILABLE_COMMANDS } = require('./constants');

const [command, project, message, hourArg] = process.argv.slice(2);

(async () => {
  if (!command) {
    console.error('Command is required');
    process.exit(1);
  }
  if (!AVAILABLE_COMMANDS.includes(command)) {
    console.error(`Command is not part of the available commands ${AVAILABLE_COMMANDS.join(', ')}`);
    process.exit(2);
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
  const completedSelector = '#timesheet_app > div > div > div.panel.panel-primary > div.panel-body > div > div:nth-child(1) > div > div.col-md-3 > div > img';
  const isCompleted = await newPage.$(completedSelector);
  if (!!isCompleted) {
    console.log('hours already completed');
    return browser.close();
  }
  if (command === TODAY_COMMAND) {
    await completeOneDay(newPage, today, project, message, hours);
  } else if (command === FULL_WEEK) {
    const monday = getMonday(today);
    await completeOneDay(newPage, monday, project, message, hours);
    await fullWeek(newPage);
  }
  await delay(1000);
  await newPage.screenshot({
    path: 'screenshots/example.png',
    fullPage: true
  });
  await browser.close();
  await openImage('screenshots/example.png');
})();
