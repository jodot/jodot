var fs = require('fs');
var npmi = require('npmi');
var path = require('path');
var Hjson = require('hjson');
var cp = require('child_process');
var scheduler = require('./lib/scheduler.js');
var runner = require('./lib/runner.js');

var Jodot = function () {};

Jodot.prototype.start = function () {

  return new Promise((resolve, reject) => {
    fs.readFile('duties.hjson', 'utf8', function(err, content) {
      if(err) {
        reject(err);
      } else {
        var duties = Hjson.rt.parse(content);
        let ingrained = duties.map((dutyDef) => {
          return new Promise((resolve, reject) => {
  	        loadDuty(dutyDef, resolve, reject);
          })
          .then((result) => {
            processDuty(result, resolve, reject);
          })
          .catch((err) => {
            console.log("error detected");
            console.log(err);
          });
        });

        Promise.all(ingrained).then(() => resolve(true));
      }
    });
  });
};

module.exports = new Jodot();

var loadDuty = function(dutyDef, resolve, reject) {
  var options = {
  	name: dutyDef.package,
    localInstall: dutyDef.localInstall
  };
  npmi(options, function (err, result) {
  	if (err) {
      reject(err);
  	}
    resolve(dutyDef);    
  });
}

var processDuty = function(dutyDef, resolve, reject) {

  console.log(dutyDef.package); 
  var duty = cp.fork(require.resolve(dutyDef.package));

  if ((dutyDef.bootstrap != undefined)) {
    duty.setup(...dutyDef.bootstrap);
  }

  if (dutyDef.schedule != undefined) {
    scheduler.scheduleDuty(duty, dutyDef);
  } else {
    runner.run(duty, dutyDef);
  }
  resolve(true);
}
