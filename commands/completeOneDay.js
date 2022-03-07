const { delay } = require('../utils');
const { weekDayMap, PROJECT_SELECTOR_ID } = require('../constants');

const completeOneDay = async (page, date, projectName, message, hours = 8) => {
  const weekDay = date.getDay();
  if (weekDay === 0 || weekDay === 6) {
    console.log('we do not support weekend working hours');
    return;
  }
  const weekSelector = weekDayMap[weekDay];
  // validate if it was already completed
  const completedSelector = ' > div.panel-body > div:nth-child(3) > div > div.row > div > div.col-xs-12.col-lg-4 > div';
  const isCompleted = await page.$(`${weekSelector}${completedSelector}`);
  if (!!isCompleted) {
    console.log('Today was already completed');
    return;
  }
  // complete one day
  // project selector
  await page.click(`${weekSelector} > div.panel-body > div.row > div:nth-child(3) > div.col-md-12.col-lg-4 > div > div.SearchableDropdown`);
  const projectSelectorIndex = PROJECT_SELECTOR_ID[weekDay];
  await page.waitForSelector(`#react-select-${projectSelectorIndex}-option-0-0`);
  await page.evaluate(projectName => {
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
    projectItem.click();
    return projectItem?.id;
  }, projectName);
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
  await page.click(`${weekSelector} > div.panel-body > div.row > div:nth-child(7) > div:nth-child(1) > p > button`);
};

module.exports = completeOneDay;
