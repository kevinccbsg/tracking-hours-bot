const { exec } = require('child_process');

const delay = time => (
  new Promise(resolve => ( 
    setTimeout(resolve, time)
  ))
);

const getMonday = d => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

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

module.exports = { delay, getMonday, openImage };
