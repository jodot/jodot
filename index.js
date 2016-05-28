var fs = require('fs');
var npmi = require('npmi');
var path = require('path');
var Hjson = require('hjson');
var process = require('./lib/process.js');

var Jodot = function () {};

Jodot.prototype.start = function(dutyFile) {
  return new Promise(function (resolve, reject) {
    fs.readFile(dutyFile, 'utf8', function(err, content) {
      if(err) {
        reject(err);
      } else {
        var duties = Hjson.rt.parse(content);
        var ingrained = duties.map((dutyDef) => {
          return new Promise((resolve, reject) => {
  	        loadDuty(dutyDef, resolve, reject);
          })
          .then((result) => {
            process(result);
          })
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
