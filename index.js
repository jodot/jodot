var fs = require('fs');
var npmi = require('npmi');
var path = require('path');
var Hjson = require('hjson');
var cp = require('child_process');
var schedule = require('node-schedule');

var schedules = [];

fs.readFile('duties.hjson', 'utf8', function(err, content) {
  var duties = Hjson.rt.parse(content);
  duties.forEach(function(dutyDef, index) {
    loadDuty(dutyDef, processDuty);
  });
});

var loadDuty = function(dutyDef, callback) {
  var options = {
  	name: dutyDef.package,
  };
  npmi(options, function (err, result) {
  	if (err) {
    	if  	(err.code === npmi.LOAD_ERR)	console.log('npm load error');
    	else if (err.code === npmi.INSTALL_ERR) console.log('npm install error');
      console.log(err.message);
  	}
    callback(dutyDef);
  });
}

var processDuty = function(dutyDef) {
  try {
    fs.accessSync(dutyDef.package, fs.F_OK);
    var duty = cp.fork(dutyDef.package);
  } catch (e) {
    var duty = cp.fork("./node_modules/"+dutyDef.package);
  }
  if ((dutyDef.bootstrap != undefined)) {
    duty.setup(...dutyDef.bootstrap);
  }
  var sd = schedule.scheduleJob(dutyDef.schedule, function(dt,dd) {
    try {
      if (dd.params == undefined) {
        dt.send([]);
      } else {
        dt.send(...dd.params);
      }
    } catch (e) {
      console.log("Duty failed: " + e);
    }
  }.bind(null, duty, dutyDef));
}
