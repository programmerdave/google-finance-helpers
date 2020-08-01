
/**
 * Reads Current Crypto Prices
 * Uses the coinbase API spot price
 *
 * @param {string} coinName The name of the coin you want to fetch.
 * @return Crypto Prices
 * @customfunction
 */
function ReadCryptoPrices(coinName) {
  
  //var coinApiKey = PropertiesService.getScriptProperties().getProperty("CoinAPIKey");
  //Change service to Coinbase. Doesn't need authentication

  var params = {
    contentType: "application/json"
  };
  
  response = UrlFetchApp.fetch('https://api.coinbase.com/v2/prices/' + coinName + '-USD/spot', params);
  rateData = JSON.parse(response.getContentText())
  
  return +rateData.data.amount;
}