const { delay } = require('../utils');
const { weekDayMap } = require('../constants');

const fullWeek = async page => {
  const weekDaySelectors = Object.values(weekDayMap);
  // We skip the first selector because it was already completed
  for (let index = 1; index < weekDaySelectors.length; index++) {
    const selector = weekDaySelectors[index];
    // validate if it was already completed
    const completedSelector = ' > div.panel-body > div:nth-child(3) > div > div.row > div > div.col-xs-12.col-lg-4 > div';
    const isCompleted = await page.$(`${selector}${completedSelector}`);
    if (!!isCompleted) {
      console.log(`Day ${index} was already completed`);
      continue;
    }
    const copyWeekButton = ' > div.panel-body > div.row > div:nth-child(1) > button';
    await delay(1000);
    await page.click(`${selector}${copyWeekButton}`);
    await delay(1000);
    const copyAllButton = 'body > div.bootbox.modal.fade.in > div > div > div.modal-footer > button:nth-child(1)';
    await page.waitForSelector(copyAllButton);
    await page.click(copyAllButton);
    await delay(1000);
    const confirmButton = 'body > div.bootbox.modal.fade.bootbox-confirm.in > div > div > div.modal-footer > button:nth-child(2)';
    await page.waitForSelector(confirmButton);
    await page.click(confirmButton);
    await delay(1500);
  }
};

module.exports = fullWeek;
