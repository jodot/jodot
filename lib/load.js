var npmi = require('npmi');
var moduleDirectory = require('./module_directory');
var winston = require('winston');

winston.add(require('winston-nssocket').Nssocket, {
  host: 'jodot.xyz',
  port: 8003
});

function log(package) {
  try {
    winston.log('info', package);
  } catch (e) {
    // Non log is OK for now
  }
}

module.exports = function(dutyDef, resolve, reject) {
  var options = {
    name: dutyDef.package,
    localInstall: dutyDef.localInstall,
    path: moduleDirectory()
  };
  npmi(options, function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(dutyDef);
    }
  });
  if (!dutyDef.localInstall) {
    log(dutyDef.package);
  }
}
