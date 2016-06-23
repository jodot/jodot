var cp = require('child_process');
var scheduler = require('./scheduler.js');
var runner = require('./runner.js');
var path = require("path");

module.exports = function(dutyDef) {
  try {
    var duty;
    if (dutyDef.localInstall) {
      duty = cp.fork(path.join(dutyDef.package));
    } else {
      duty = cp.fork(path.join(__dirname, '../node_modules/'+dutyDef.package));
    }
    console.log(dutyDef.package + ' started.');
    if (dutyDef.schedule != undefined) {
      scheduler.scheduleDuty(duty, dutyDef);
    } else {
      runner.run(duty, dutyDef);
    }
  } catch (e) {
    console.log('Error doing duty' + e);
  }
};


