var schedule = require('node-schedule');
var runner = require('./runner.js');
var Scheduler = function () {

}

Scheduler.prototype.scheduleDuty = function (duty, dutyDef) {

  var sd = schedule.scheduleJob(dutyDef.schedule, function(dt,dd) {
    runner.run(duty, dutyDef);
  }.bind(null, duty, dutyDef));

}

module.exports = new Scheduler();
