var gas = require('gas-local');

var expect = require('expect.js');

var sinon = require('sinon');

var glib;
var defMock = gas.globalMockDefault;

describe('IsLeftToPayInCycle', function() {
  this.beforeAll(function() {
    //Mock MailApp by extending default mock object
    /*var customMock = { 
      MailApp: { getRemainingDailyQuota: function () { return 50; } },
      __proto__: defMock 
    };*/

    glib = gas.require('./src');
  });

  describe('#IsLeftToPayInCycle()', function() {
    it('should work', function() {
      expect(glib.IsLeftToPayInCycle(1, 7, 12, new Date("1/1/2020"))).to.be(false);
    });
  });
});

describe('ReadCryptoPrices', function() {
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