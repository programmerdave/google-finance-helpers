var gas = require('gas-local');

var expect = require('expect.js');

var sinon = require('sinon');

var defMock = gas.globalMockDefault;

describe('IsLeftToPayInCycle', function() {
  var glib;
  this.beforeAll(function() {
    glib = gas.require('./src');
  });
//currentDate, cycleEndDay, billDueDay
  describe('#IsLeftToPayInCycle()', function() {
    describe('when today is after the cycle end day', function() {
      var currentDate = new Date("1/13/2019");
      var cycleEndDay = 6;
      it('should return false if the bill due day has passed', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 11)).to.be(false);
      });

      it('should return true if the bill due day has not passed', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 18)).to.be(true);
      });

      it('should return true if the bill due day has passed and is before the cycle end day', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2)).to.be(true);
      });

      it('should return true if the bill due day has passed and is the same as the cycle end day', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6)).to.be(true);
      });

      it('should return false if the bill due day has passed and is after the cycle end day', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7)).to.be(false);
      });
    });

    describe('when today is after the start of the month but before the cycle end day', function() {
      var currentDate = new Date("1/3/2019");
      var cycleEndDay = 6;
      it('should return false if the bill due day has passed', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2)).to.be(false);
      });

      it('should return true if the bill due day has not passed', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 4)).to.be(true);
      });

      it('should return true if the bill due day has not passed and is the same as the cycle end day', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6)).to.be(true);
      });

      it('should return false if the bill due day has not passed and is after the cycle end day', function() {
        expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7)).to.be(false);
      });
    });
  });
});

describe('ReadCryptoPrices', function() {
  var glib;
  describe('#TestCrypto()', function() {
    this.beforeEach(function() {
      var propertiesMock = {
        getProperty: sinon.fake.returns("12345")
      };

      var responseMock = {
        getContentText: sinon.fake.returns('{"rate": 124}')
      };

      var customMock = { 
        PropertiesService: { getScriptProperties: sinon.fake.returns(propertiesMock) },
        UrlFetchApp: { fetch: sinon.fake.returns(responseMock) },
        __proto__: defMock 
      };

      glib = gas.require('./src', customMock);
    });

    it('should get the coin price', function() {
      expect(glib.ReadCryptoPrices("BCH")).to.equal(124);
    });

    it('should have received the correct API url', function() {
      glib.ReadCryptoPrices("BCH");
      expect(glib.UrlFetchApp.fetch.getCall(0).args[0]).to.equal("https://rest.coinapi.io/v1/exchangerate/BCH/USD");
    });

    it('should have received the correct params', function() {
      glib.ReadCryptoPrices("BCH");
      expect(glib.UrlFetchApp.fetch.getCall(0).args[1].headers["X-CoinAPI-Key"]).to.equal("12345");
    });
  });
});