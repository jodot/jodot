var cp = require('child_process');
var path = require('path');
var scheduler = require('./scheduler.js');
var runner = require('./runner.js');
var listener = require('./listener.js');
var moduleDirectory = require('./module_directory');

module.exports = function(dutyDef) {
  try {
    var duty;
    if (dutyDef.localInstall) {
      duty = cp.fork(path.join(dutyDef.package));
    } else {
     duty = cp.fork(path.join(moduleDirectory(), 'node_modules', dutyDef.package));
    }
    global.duties[dutyDef.package] = {
      definition: dutyDef,
      instantiation: duty
    };
    listener.listen(duty);
    console.log(dutyDef.package + ' started.');
    if (dutyDef.schedule != undefined) {
      scheduler.scheduleDuty(dutyDef.package);
    } else {
      runner.run(dutyDef.package);
    }
  } catch (e) {
    console.log('Error doing duty' + e);
  }
};
