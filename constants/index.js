const TODAY_COMMAND = 'today';
const FULL_WEEK = 'week';

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

const PROJECT_SELECTOR_ID = {
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
};

module.exports = {
  AVAILABLE_COMMANDS,
  TODAY_COMMAND,
  FULL_WEEK,
  weekDayMap,
  PROJECT_SELECTOR_ID,
};
