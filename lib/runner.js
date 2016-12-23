var Runner = function () {
};

Runner.prototype.run = function (package) {
  var duty = global.duties[package].instantiation;
  var dutyDef = global.duties[package].definition;
  try {
    if (dutyDef.params) {
      duty.send(dutyDef.params);
    } else {
      duty.send([]);
    }
  } catch (e) {
    console.log("Duty failed: " + e);
  }
}
module.exports = new Runner();