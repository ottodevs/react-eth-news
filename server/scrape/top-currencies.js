const _ = require('lodash');
const rp = require('request-promise');
const Promise = require('bluebird');
const fetchTop100FromCoinMarketCap = () =>
  rp(`https://api.coinmarketcap.com/v1/ticker/?limit=50`)
  .then(collection => JSON.parse(collection)
    .map(coin => _.assignIn({
      ticker: coin.symbol,
      search: `buy ${coin.name.toLowerCase()}`
    }, coin)))
  .then(collection => _.keyBy(collection, 'ticker'))

module.exports = fetchTop100FromCoinMarketCap()
