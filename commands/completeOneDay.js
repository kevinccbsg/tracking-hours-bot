const { delay } = require('../utils');
/**
 * This will map week days with the victoria selectors
 */
const weekDayMap = {
  1: '#timesheet_app > div > div > div.panel.panel-primary > div.panel-body > div > div:nth-child(6)',
  2: '#timesheet_app > div > div > div.panel.panel-primary > div.panel-body > div > div:nth-child(7)',
  3: '#timesheet_app > div > div > div.panel.panel-primary > div.panel-body > div > div:nth-child(8)',
  4: '#timesheet_app > div > div > div.panel.panel-primary > div.panel-body > div > div:nth-child(9)',
  5: '#timesheet_app > div > div > div.panel.panel-primary > div.panel-body > div > div:nth-child(10)',
};

const completeOneDay = async (page, date, projectName, message, hours = 8) => {
  const weekDay = date.getDay();
  const weekSelector = weekDayMap[5];
  // complete one day
  // project selector
  await page.click(`${weekSelector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-4 > div > div.SearchableDropdown`)
  await page.waitForSelector('#react-select-10-option-0-0');
  const elementId = await page.evaluate((selector, projectName) => {
    // $x() is not a JS standard -
    // this is only sugar syntax in chrome devtools
    // use document.evaluate()
    const projectItem = document
        .evaluate(
            `//div[text()="${projectName}"]`,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
        )
        .singleNodeValue;
    console.log('node', projectItem);
    projectItem.click();
    return projectItem?.id;
  }, weekSelector, projectName);
  // click project
  await page.click(`${weekSelector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-4 > div > div.SearchableDropdown`)
  // Comment input
  await delay(500);
  await page.type(`${weekSelector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-6 > div > input`, message);
  // Hour time
  await page.evaluate(selector => {
    document.querySelector(`${selector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-2 > div > div:nth-child(1) > input`).value = '0'
    console.log(`${selector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-2 > div > div:nth-child(1) > input`);
  }, weekSelector);
  await page.type(`${weekSelector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-2 > div > div:nth-child(1) > input`, `${hours}`);
  // add button
  // await page.click(`${weekSelector} > div.panel-body > div.row > div:nth-child(7) > div:nth-child(1) > p > button`);
};

module.exports = completeOneDay;
