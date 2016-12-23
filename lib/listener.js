var runner = require('./runner.js');

var Listener = function () {
};

Listener.prototype.listen = function (duty) {
  duty.on('message', function(m) {
    if (m.do) {
      console.log('Triggered: ' + m.do);
      try {
        runner.run(m.do);
      } catch(e) {
        console.log('Could not trigger duty');
      }
    }
  });
}

module.exports = new Listener();