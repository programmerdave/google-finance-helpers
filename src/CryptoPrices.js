
/**
 * Reads Current Crypto Prices
 * Uses the coinbase API spot price
 *
 * @param {string} coinName The name of the coin you want to fetch.
 * @param {Date} date The date in UTC to fetch the price
 * @return Crypto Prices
 * @customfunction
 */
function ReadCryptoPrices(coinName, date) {
  
  if (!date || Object.prototype.toString.call(date) !== '[object Date]') {
    throw new Error("Invalid Date");
  }

  //var coinApiKey = PropertiesService.getScriptProperties().getProperty("CoinAPIKey");
  //Change service to Coinbase. Doesn't need authentication

  var params = {
    contentType: "application/json"
  };
  
  //getMonth and getUTCMonth are zero based!!
  response = UrlFetchApp.fetch('https://api.coinbase.com/v2/prices/' + coinName + `-USD/spot?date=${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`, params);
  rateData = JSON.parse(response.getContentText());
  
  return +rateData.data.amount;
}