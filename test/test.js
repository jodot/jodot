var rewire = require('rewire');
var requireUncached = require('require-uncached');
var sinon = require('sinon');
require('sinon-as-promised');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var assert = chai.assert;

describe('jodot', function () {
  var jodot = rewire('../index.js');
  describe('#start()', function () {
    describe('initially', function () {
      it('should return a promise', sinon.test(function (done) {
        assert.eventually.instanceOf(jodot.start('duties.hjson'), Promise).notify(done());
      }));
    });
    describe('file not loadable', function () {
      it('should throw an error if the duties.hjson file cannot be read',function (done) { 
        var testOutcome = jodot.start('nofile'); 
        assert.eventually.equal(testOutcome, 'test error').notify(done());
      });
    });
    describe('rejected', function () {
      var revert;
      it('should throw an error if any duty fails to load', sinon.test(function (done) {
        revert = jodot.__set__('load', sinon.stub().rejects('test error'));
        assert.eventually.equal(jodot.start('duties.hjson'), 'test error').notify(done());
      }));
      afterEach(function () {
        revert();
      });
    });
    describe('ok', function () {
      var revert;
      it('should throw an error if any duty fails to load', sinon.test(function (done) {

        var processStub = sinon.stub();
        var loadStub = function(dutyDef, resolve, reject) {
          console.log('load stub called');
          resolve('test');
        };
        revert = jodot.__set__({
          'process': processStub,
          'load': loadStub
        });

        jodot.start('duties.hjson').then(function(){
          console.log('hello');
          sinon.assert.calledOnce(processStub);
          done();
        });

      }));
      afterEach(function () {
        revert();
      });
    });
  });
});

describe('.processDuty()', function () {
  var process = rewire('../lib/process.js');
  it('should run a scheduled duty', function () {
    var dutyDef = {package: 'jodot-alive', schedule: '1 * * * * *'}; 
  });
});
