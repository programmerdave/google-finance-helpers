
/**
 * Reads Current Crypto Prices
 *
 * @param {string} coinName The name of the coin you want to fetch.
 * @return Crypto Prices
 * @customfunction
 */
function ReadCryptoPrices(coinName) {
  
  var coinApiKey = PropertiesService.getScriptProperties().getProperty("CoinAPIKey");
  
  var params = {
    contentType: "application/json",
    headers: {
      "X-CoinAPI-Key": coinApiKey
    }
  };
  
  Logger.log(JSON.stringify(params));
  
  response = UrlFetchApp.fetch('https://rest.coinapi.io/v1/exchangerate/' + coinName + '/USD', params);
  rateData = JSON.parse(response.getContentText())
  
  return rateData.rate;
}

function TestCrypto() {
  Logger.log(ReadCryptoPrices("BCH"));
}