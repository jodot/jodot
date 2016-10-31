var npmi = require('npmi');
var moduleDirectory = require('./module_directory');

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
}
