const router = require('express').Router();
const rp = require('request-promise');
const _ = require('lodash');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
const currencies = require('../currencies');

module.exports = router;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getDataInNthInterval = function(data, interval) {
  var dataInNthInterval = [];
  for (i = 0; i <= data.length; i = i + interval) {
    dataInNthInterval.push(data[i]);
  }
  return dataInNthInterval
}

const generateDailyPriceMiddleware = function(currencyA, currencyB) {
  return (req, res, next) => {
    // can get up to past 84 days
    const apiEndPoint = `https://min-api.cryptocompare.com/data/histohour?fsym=${currencyA.toUpperCase()}&tsym=${currencyB.toUpperCase()}&aggregate=3&e=CCCAGG&limit=2000`;
    rp(apiEndPoint)
      .then(histPrices => {
        histPrices = JSON.parse(histPrices)
        if (!histPrices['Data']) {
          const error = new Error('Not Found')
          error.status = 404
          next(error)
        } else {
          const pairingKey = currencyA + capitalizeFirstLetter(currencyB)
          const pricesOvertime = histPrices['Data'].map(price => {
            var priceData = {
              date: moment.unix(price.time).format('YYYY-MM-DD'),
            }
            priceData[pairingKey] = price.open
            return priceData
          });
          res.send(getDataInNthInterval(pricesOvertime, 8))
          return pricesOvertime;
        }

      }).catch(next);
  }
}

const generateTwoYearPriceMiddleware = function(currencyA, currencyB) {
  return (req, res, next) => {
    const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=${currencyA.toUpperCase()}&tsym=${currencyB.toUpperCase()}&aggregate=3&e=CCCAGG&limit=2000`;
    const startDate = new Date(moment().subtract(2, 'years'));
    const endDate = new Date(Date.now());
    const range = moment.range(startDate, endDate)
    rp(apiEndPoint)
      .then(histPrices => {
        histPrices = JSON.parse(histPrices)
        if (!histPrices['Data']) {
          const error = new Error('Not Found')
          error.status = 404
          next(error)
        } else {
          const pairingKey = currencyA + capitalizeFirstLetter(currencyB)
          const pricesOvertime = histPrices['Data'].map(price => {
            var priceData = {
              date: moment.unix(price.time).format('YYYY-MM-DD'),
            }
            priceData[pairingKey] = price.open
            return priceData
          }).filter(price => {
            return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          res.send(pricesOvertime)
          return pricesOvertime;
        }
      }).catch(next);
  }
}

for (let currency in currencies) {
  router.get(`/${currency}usd/daily`, generateDailyPriceMiddleware(currency, 'usd'))
}

for (let currency in currencies) {
  router.get(`/${currency}usd/years`, generateTwoYearPriceMiddleware(currency, 'usd'))
}
