var fs = require('fs');
var npmi = require('npmi');
var path = require('path');
var Hjson = require('hjson');
var cp = require('child_process');
var scheduler = require('./lib/scheduler.js');
var runner = require('./lib/runner.js');
var path = require("path");

var Jodot = function () {};

Jodot.prototype.start = () => {

  return new Promise(function (resolve, reject) {
    fs.readFile('duties.hjson', 'utf8', function(err, content) {
      if(err) {
        reject(err);
      } else {
        var duties = Hjson.rt.parse(content);
        var ingrained = duties.map((dutyDef) => {
          return new Promise((resolve, reject) => {
  	        loadDuty(dutyDef, resolve, reject);
          })
          .then((result) => {
            processDuty(result, resolve, reject);
          })
          .then((result) => {
            processDuty(result, resolve, reject);
          })
          .catch((err) => {
            reject(err);
          });
        });

        Promise.all(ingrained).then(() => resolve());
      }
    });
  });
};

module.exports = new Jodot();

var loadDuty = function(dutyDef, resolve, reject) {
  var options = {
  	name: dutyDef.package,
    localInstall: dutyDef.localInstall,
    path: __dirname
  };
  npmi(options, function (err, result) {
  	if (err) {
      reject(err);
  	} else {
      resolve(dutyDef);
    }
  });
}

var processDuty = function(dutyDef, resolve, reject) {

  var duty = cp.fork(path.join(__dirname, 'node_modules/'+dutyDef.package));

  if (dutyDef.schedule != undefined) {
    scheduler.scheduleDuty(duty, dutyDef);
  } else {
    runner.run(duty, dutyDef);
  }

  resolve();
}
