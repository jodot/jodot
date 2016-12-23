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
        var dutyDefs = Hjson.rt.parse(content);
        global.duties = {};
        var committed = dutyDefs.map(function(dutyDef) {
          return new Promise(function(resolve, reject) {
  	        load(dutyDef, resolve, reject);
          })
          .then(function(result) {
            process(result);
          })
          .catch(function(error) {
            console.log('Error starting duty: '+error);
          })
        });
        Promise.all(committed).then(function() {resolve()});
      }
    });
  });
};

module.exports = new Jodot();
