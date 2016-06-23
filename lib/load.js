var npmi = require('npmi');

module.exports = function(dutyDef, resolve, reject) {
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
};
