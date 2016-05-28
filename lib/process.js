var cp = require('child_process');
var scheduler = require('./scheduler.js');
var runner = require('./runner.js');
var path = require("path");

module.exports = function(dutyDef) {

  var duty = cp.fork(path.join(__dirname, '../node_modules/'+dutyDef.package));
  console.log(dutyDef.package);
  if (dutyDef.schedule != undefined) {
    scheduler.scheduleDuty(duty, dutyDef);
  } else {
    runner.run(duty, dutyDef);
  }
};

