var schedule = require('node-schedule');
var runner = require('./runner.js');
var Scheduler = function () {
}

Scheduler.prototype.scheduleDuty = function (package) {
  var dutyDef = global.duties[package].definition;
  var sd = schedule.scheduleJob(dutyDef.schedule, function() {
    runner.run(package);
  }.bind(null, package));
}

module.exports = new Scheduler();
