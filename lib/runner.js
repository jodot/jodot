var Runner = function () {

};

Runner.prototype.run = function (duty, dutyDef) {

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
