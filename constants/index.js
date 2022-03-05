const TODAY_COMMAND = 'today';
const FULL_WEEK = 'fullWeek';

const AVAILABLE_COMMANDS = [
  TODAY_COMMAND,
  FULL_WEEK,
];

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

module.exports = {
  AVAILABLE_COMMANDS,
  TODAY_COMMAND,
  FULL_WEEK,
  weekDayMap,
};
