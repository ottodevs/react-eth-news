const router = require('express').Router();
const rp = require('request-promise');
const _ = require('lodash');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
module.exports = router;

const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;

router.get('/ethusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const ethUsdOverTime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          ethUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(ethUsdOverTime)
      return ethUsdOverTime;
    })
})

router.get('/btcusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const ethUsdOverTime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          btcUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(ethUsdOverTime)
      return ethUsdOverTime;
    })
})
