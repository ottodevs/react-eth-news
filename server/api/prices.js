const router = require('express').Router();
const rp = require('request-promise');
const _ = require('lodash');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
module.exports = router;

router.get('/ethusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const pricesOvertime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          ethUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(pricesOvertime)
      return pricesOvertime;
    })
})

router.get('/btcusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const pricesOvertime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          btcUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(pricesOvertime)
      return pricesOvertime;
    })
})

router.get('/xrpusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=XRP&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const pricesOvertime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          xrpUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(pricesOvertime)
      return pricesOvertime;
    })
})

router.get('/xemusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=XEM&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const pricesOvertime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          xemUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(pricesOvertime)
      return pricesOvertime;
    })
})

router.get('/ltcusd', (req, res, next) => {
  const apiEndPoint = `https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&aggregate=3&e=CCCAGG&limit=2000`;
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'));
  const endDate = new Date(Date.now());
  const range = moment.range(startDate, endDate)
  rp(apiEndPoint)
    .then(histPrices => {
      const pricesOvertime = JSON.parse(histPrices)['Data'].map(price => {
        return {
          date: moment.unix(price.time).format('YYYY-MM-DD'),
          ltcUsd: price.open
        }
      }).filter(price => {
        return range.contains(moment(price.date, 'YYYY-MM-DD'), { exclusive: false })
      });
      res.send(pricesOvertime)
      return pricesOvertime;
    })
})
