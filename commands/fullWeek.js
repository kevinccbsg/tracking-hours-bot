const { delay } = require('../utils');
const { weekDayMap } = require('../constants');

const fullWeek = async newPage => {
  const weekDaySelectors = Object.values(weekDayMap);
  // We skip the first selector because it was already completed
  for (let index = 1; index < weekDaySelectors.length; index++) {
    const selector = weekDaySelectors[index];
    const copyWeekButton = ' > div.panel-body > div.row > div:nth-child(1) > button';
    await newPage.click(`${selector}${copyWeekButton}`);
    await delay(500);
    const copyAllButton = 'body > div.bootbox.modal.fade.in > div > div > div.modal-footer > button:nth-child(1)';
    await newPage.waitForSelector(copyAllButton);
    await newPage.click(copyAllButton);
    await delay(500);
    const confirmButton = 'body > div.bootbox.modal.fade.bootbox-confirm.in > div > div > div.modal-footer > button:nth-child(2)';
    await newPage.waitForSelector(confirmButton);
    await newPage.click(confirmButton);
    await delay(2000);
  }
};

module.exports = fullWeek;
