var gas = require('gas-local');

var expect = require('expect.js');

var sinon = require('sinon');

var defMock = gas.globalMockDefault;

describe('IsLeftToPayInCycle', function() {
  var glib;
  this.beforeAll(function() {
    glib = gas.require('./src');
  });

  describe('#IsLeftToPayInCycle()', function() {
    var shouldBehaveRegularly = function() {
      describe('when today is after the cycle end day', function() {
        var currentDate = new Date("1/13/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 11, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return true if the bill due day has not passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 18, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return false if the bill due day is set to this month after the cycle end day and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return true if the bill due day is set to next month before the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return true if the bill due day is set to next month on the same day as the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(true);
        });
      });

      describe('when today is after the start of the month but before the cycle end day', function() {
        var currentDate = new Date("1/3/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day is set to the next month and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return true if the bill due day is set to the next month and the bill due day has not passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 4, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return true if the bill due day is set to the next month and the bill due day is today', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 3, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return true if the bill due day is set to the next month on the same day as the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return false if the bill due day is set to the current month and is after the cycle end day', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });
      });
    };

    describe('Should behave regularly if one time payment date is undefined', function() {
      this.beforeEach(function() {
        this.oneTimePaymentDate = undefined;
      });

      shouldBehaveRegularly();
    });

    describe('Should behave regularly if one time payment date is null', function() {
      this.beforeEach(function() {
        this.oneTimePaymentDate = null;
      });

      shouldBehaveRegularly();
    });

    describe('Should behave regularly if one time payment date is a blank string', function() {
      this.beforeEach(function() {
        this.oneTimePaymentDate = "";
      });

      shouldBehaveRegularly();
    });

    describe('when there is a one time payment date that is not in this month or next month', function() {
      this.beforeEach(function() {
        this.oneTimePaymentDate = new Date("3/1/2019");
      });

      describe('when today is after the cycle end day', function() {
        var currentDate = new Date("1/13/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 11, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day has not passed since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 18, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to this month after the cycle end day and the bill due day has passed since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to next month before the cycle end day and the bill due day has not passed yet since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to next month on the same day as the cycle end day and the bill due day has not passed yet since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(false);
        });
      });

      describe('when today is after the start of the month but before the cycle end day', function() {
        var currentDate = new Date("1/3/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day is set to the next month and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to the next month and the bill due day has not passed since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 4, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to the next month and the bill due day is today since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 3, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to the next month on the same day as the cycle end day and the bill due day has not passed yet since the one time payment date is not this month or next month', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to the current month and is after the cycle end day', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });
      }); 
    });

    describe('when there is a one time payment date that is in this month', function() {
      this.beforeEach(function() {
        this.oneTimePaymentDate = new Date("1/1/2019");
      });

      describe('when today is after the cycle end day', function() {
        var currentDate = new Date("1/13/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 11, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return true if the bill due day has not passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 18, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return false if the bill due day is set to this month after the cycle end day and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });

        //since it's next month and we expect the one time payment date to be this month, then it's not due
        it('should return false if the bill due day is set to next month before the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(false);
        });

        //since it's next month and we expect the one time payment date to be this month, then it's not due
        it('should return false if the bill due day is set to next month on the same day as the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(false);
        });
      });

      describe('when today is after the start of the month but before the cycle end day', function() {
        var currentDate = new Date("1/3/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day is set to the next month and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(false);
        });

        //since it's next month and we expect the one time payment date to be this month, then it's not due
        it('should return false if the bill due day is set to the next month and the bill due day has not passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 4, this.oneTimePaymentDate)).to.be(false);
        });

        //since it's next month and we expect the one time payment date to be this month, then it's not due
        it('should return false if the bill due day is set to the next month and the bill due day is today', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 3, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to the next month on the same day as the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to the current month and is after the cycle end day', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });
      }); 
    });

    describe('when there is a one time payment date that is next month', function() {
      this.beforeEach(function() {
        this.oneTimePaymentDate = new Date("2/1/2019");
      });

      describe('when today is after the cycle end day', function() {
        var currentDate = new Date("1/13/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 11, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day has not passed since this month there is no one time payment', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 18, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return false if the bill due day is set to this month after the cycle end day and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return true if the bill due day is set to next month before the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return true if the bill due day is set to next month on the same day as the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(true);
        });
      });

      describe('when today is after the start of the month but before the cycle end day', function() {
        var currentDate = new Date("1/3/2019");
        var cycleEndDay = 6;
        it('should return false if the bill due day is set to the next month and the bill due day has passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 2, this.oneTimePaymentDate)).to.be(false);
        });

        it('should return true if the bill due day is set to the next month and the bill due day has not passed', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 4, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return true if the bill due day is set to the next month and the bill due day is today', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 3, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return true if the bill due day is set to the next month on the same day as the cycle end day and the bill due day has not passed yet', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 6, this.oneTimePaymentDate)).to.be(true);
        });

        it('should return false if the bill due day is set to the current month and is after the cycle end day', function() {
          expect(glib.IsLeftToPayInCycle(currentDate, cycleEndDay, 7, this.oneTimePaymentDate)).to.be(false);
        });
      });
    });
  });

  describe('#AddDays', function() {
    it("should go to next month if a month of days are added", function() {
      var newDate = glib.AddDays(new Date("1/1/2019"), 31);
      expect(newDate.getMonth()).to.equal(1); // getMonth is zero based
    });

    it("should stay in the same year if it's not december", function() {
      var newDate = glib.AddDays(new Date("1/1/2019"), 31);
      expect(newDate.getFullYear()).to.equal(2019);
    });

    it("should go to the next year if it's december", function() {
      var newDate = glib.AddDays(new Date("12/1/2019"), 31);
      expect(newDate.getFullYear()).to.equal(2020);
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
        getContentText: sinon.fake.returns('{ \
          "data": { \
            "amount": "1015.00", \
            "currency": "USD" \
          } \
        }')
      };

      var customMock = { 
        PropertiesService: { getScriptProperties: sinon.fake.returns(propertiesMock) },
        UrlFetchApp: { fetch: sinon.fake.returns(responseMock) },
        __proto__: defMock 
      };

      glib = gas.require('./src', customMock);
    });

    it('should get the coin price', function() {
      expect(glib.ReadCryptoPrices("BTC")).to.equal(1015);
    });

    it('should have received the correct API url', function() {
      glib.ReadCryptoPrices("BTC");
      expect(glib.UrlFetchApp.fetch.getCall(0).args[0]).to.equal("https://api.coinbase.com/v2/prices/BTC-USD/spot");
    });

    /*it('should have received the correct params', function() {
      glib.ReadCryptoPrices("BCH");
      expect(glib.UrlFetchApp.fetch.getCall(0).args[1].headers["X-CoinAPI-Key"]).to.equal("12345");
    });*/
  });
});