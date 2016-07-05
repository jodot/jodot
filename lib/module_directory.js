var path = require('path');

module.exports = function() {
  var subDir = '.jodot';
  var baseDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  return (subDir) ? path.join(baseDir, subDir) : baseDir;
};
