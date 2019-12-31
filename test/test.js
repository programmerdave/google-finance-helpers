var gas = require('gas-local');

var glib = gas.require('./src');

var expect = require('expect.js');

describe('IsLeftToPayInCycle', function() {
  describe('#IsLeftToPayInCycle()', function() {
    it('should work', function() {
      expect(glib.IsLeftToPayInCycle(1, 7, 12, new Date("1/1/2020"))).to.be(true);
    });
  });
});