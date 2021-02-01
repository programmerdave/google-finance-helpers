/**
 * Reads Current Crypto Prices
 * Uses the coinbase API spot price
 *
 * @param {string} coinName The name of the coin you want to fetch.
 * @param {Date} date The date local or UTC to fetch the price. The price is fetched according to UTC time
 * @return Crypto Prices
 * @customfunction
 */
function ReadCryptoPrices(coinName) {
  var params = {
    contentType: "application/json"
  };

  //since Kraken doesn't offer the spot price through it's API, use the ask price
  //https://www.kraken.com/en-us/features/api#get-ticker-info
  response = UrlFetchApp.fetch('https://api.kraken.com/0/public/Ticker?pair=' + coinName.toUpperCase() + `USD`, params);
  rateData = JSON.parse(response.getContentText());
  
  const result = rateData.result;
  return +result[Object.keys(result)[0]].a[0];
}