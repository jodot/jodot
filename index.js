var fs = require('fs');
var path = require('path');
var Hjson = require('hjson');
var process = require('./lib/process.js');
var load = require('./lib/load.js');

var Jodot = function () {};

Jodot.prototype.start = function(dutyFile) {
  return new Promise(function (resolve, reject) {
    fs.readFile(dutyFile, 'utf8', function(err, content) {
      if(err) {
        reject(err);
      } else {
        var duties = Hjson.rt.parse(content);
        var committed = duties.map(function(dutyDef) {
          return new Promise(function(resolve, reject) {
  	        load(dutyDef, resolve, reject);
          })
          .then(function(result) { 
            process(result);
          })
        });
        Promise.all(committed).then(function() {resolve()});
      }
    });
  });
};

module.exports = new Jodot();

