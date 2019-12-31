
/**
 * Reads Current Crypto Prices
 *
 * @param {string} coinName The name of the coin you want to fetch.
 * @return Crypto Prices
 * @customfunction
 */
function ReadCryptoPrices(coinName) {
  var params = {
    contentType: "application/json",
    headers: {
      "X-CoinAPI-Key": PropertyService.getScriptProperties().getProperty("CoinAPIKey")
    }
  };
  
  response = UrlFetchApp.fetch('https://rest.coinapi.io/v1/exchangerate/' + coinName + '/USD', params);
  rateData = JSON.parse(response.getContentText())
  
  return rateData.rate;
}