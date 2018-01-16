const _ = require('lodash');
const router = require('express').Router();
const googleTrends = require('google-trends-api');
const rp = require('request-promise');
const Promise = require('bluebird');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
const interpolateLineRange = require('line-interpolate-points')
const googleTrendsOverTimePromise = Promise.promisify(googleTrends.interestOverTime)
const { GoogleTrend } = require('../db/models');
const getCurrencies = require('../scrape/top-currencies');
const timeout = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
module.exports = router

const interpolate = function(data, queryEndDate) {
  var prevTime = undefined;
  var prevValue = undefined;
  var interpolatedData = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var curTime = item.date;
    var curVal = item.googleTrends;
    if (prevTime) {
      // exit loop until prevTime === curTime
      var step = moment(prevTime).add(1, 'd');
      var interpolation = interpolateLineRange([
        [0, Number(prevValue)],
        [3, Number(curVal)]
      ], 8);
      var j = 0;
      while (step.format('YYYY-MM-DD') !== curTime) {
        interpolatedData.push({
          date: step.format('YYYY-MM-DD'),
          googleTrends: Math.round(interpolation[j][1])
        })
        j++;
        step = step.add(1, 'd')
      }
    }

    // NEW ONE
    interpolatedData.push(item);

    // FOR NEXT TIME
    prevTime = curTime;
    prevValue = curVal;
  }

  return interpolatedData
}

const getDataInNthInterval = function(data, interval) {
  var dataInNthInterval = [];
  for (i = 0; i <= data.length; i = i + interval) {
    dataInNthInterval.push(data[i]);
  }
  return dataInNthInterval
}

const fetchDailyGoogleTrends = function(searchTerm, startDate, currentDate) {
  return googleTrendsOverTimePromise({
    keyword: searchTerm,
    startTime: startDate,
    endTime: currentDate
  }).then(response => {
    return JSON.parse(response).default.timelineData.map(datum => {
      return {
        date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
        googleTrends: datum.value[0]
      }
    })
  })
}

const fetchTwoYearsGoogleTrends = function(searchTerm, queryStartDate, queryEndDate, range) {
  return googleTrendsOverTimePromise({
    keyword: searchTerm,
    startTime: queryStartDate,
    endTime: queryEndDate
  }).then(response => {
    return interpolate(JSON.parse(response).default.timelineData.map(datum => {
      return {
        date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
        googleTrends: datum.value[0]
      }
    }), moment(queryEndDate)).filter(trend => {
      return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
    });
  })
}

const fetchFromCoinMarketCap = () =>
  rp(`https://api.coinmarketcap.com/v1/ticker/?limit=60`)
  .then(collection => _.keyBy(JSON.parse(collection), 'symbol'))

const generateDailyTrendMiddleware = function(ticker, searchTerm) {
  return (req, res, next) => {
    const currentMoment = moment()
    const startMoment = moment().subtract(84, 'days')
    const currentDate = new Date(currentMoment.format('MMM DD, YYYY'))
    const startDate = new Date(startMoment.format('MMM DD, YYYY'))
    range = moment.range(startDate, currentDate)
    return GoogleTrend.findOne({ where: { id: ticker + '1D', interval: '1D' } })
      .then(currency => {
        if (currency) {
          const needUpdate = currency ?
            parseInt(moment().subtract(2, 'days').format('YYYYMMDD')) >=
            parseInt(moment.unix(currency.timestamp).format('YYYYMMDD')) : null;
          if (needUpdate) {
            return fetchDailyGoogleTrends(searchTerm, startDate, currentDate)
              .then(timeseries => {
                if (typeof timeseries !== 'object') throw new Error()
                res.send(timeseries)

                return currency.update({
                  trend: timeseries,
                  timestamp: moment().format('X')
                })
              })
          } else {
            res.send(currency.trend)
            return currency
          }
        } else {
          return fetchDailyGoogleTrends(searchTerm, startDate, currentDate)
            .then(timeseries => {
              if (typeof timeseries !== 'object') throw new Error()
              res.send(timeseries);

              return GoogleTrend.create({
                id: ticker + '1D',
                interval: '1D',
                trend: timeseries,
                timestamp: moment().format('X')

              })
            })
        }
      }).catch(err => {
        console.log(err)
        res.sendStatus(404)
      });





  }
}

const generateTwoYearTrendMiddleware = function(ticker, searchTerm) {
  return (req, res, next) => {
    const queryStartDate = new Date(moment().subtract(2, 'years'))
    const queryEndDate = new Date(Date.now())
    const range = moment.range(queryStartDate, queryEndDate)
    return GoogleTrend.findOne({ where: { id: ticker + '2Y', interval: '2Y' } })
      .then(currency => {
        if (currency) {
          const needUpdate = currency ?
            parseInt(moment().subtract(3, 'days').format('YYYYMMDD')) >=
            parseInt(moment.unix(currency.timestamp).format('YYYYMMDD')) : null;
          if (needUpdate) {
            return fetchTwoYearsGoogleTrends(searchTerm, queryStartDate, queryEndDate, range)
              .then(googleTrends => {
                res.send(googleTrends);
                return currency.update({
                  trend: googleTrends,
                  timestamp: moment().format('X')
                })
              })
          } else {
            res.send(currency.trend)
            return currency
          }
        } else {
          return fetchTwoYearsGoogleTrends(searchTerm, queryStartDate, queryEndDate, range)
            .then(googleTrends => {
              res.send(googleTrends);
              return GoogleTrend.create({
                id: ticker + '2Y',
                interval: '2Y',
                interval: '2Y',
                trend: googleTrends,
                timestamp: moment().format('X')
              })
            })
        }
      }).catch(err => {
        console.log(err)
        res.sendStatus(404)
      });

  }
}

const fetchAllCoinStats = function() {
  const currentMoment = moment()
  const startMoment = moment().subtract(84, 'days')
  const currentDate = new Date(currentMoment.format('MMM DD, YYYY'))
  const startDate = new Date(startMoment.format('MMM DD, YYYY'))
  return getCurrencies
    .then(currencies => Promise.map(_.values(currencies), async function(currency) {
      const randomDelay = ((min, max) => Math.random() * (max - min) + min)(10, 25);
      await timeout(randomDelay);
      return fetchDailyGoogleTrends(currency.search, startDate, currentDate)
        .then(timeseries => {
          if (timeseries.length) {
            const lastWeekTrend = timeseries.slice(-7);
            const start = !!lastWeekTrend[0].googleTrends ?
              lastWeekTrend[0].googleTrends : 1;
            const delta = (lastWeekTrend.slice(-1)[0].googleTrends - start) / start * 100;
            return {
              rank: currency.rank,
              name: currency.name,
              ticker: currency.ticker,
              marketCapUsd: Math.round(currency.market_cap_usd),
              priceUsd: currency.price_usd,
              pricePercentChange24h: currency.percent_change_24h,
              pricePercentChange7d: currency.percent_change_7d,
              trendPercentChange7d: Math.round(delta, -2),
              startDate: lastWeekTrend[0].date,
              endDate: lastWeekTrend.slice(-1)[0].date
            }

          } else {
            return {
              rank: currency.rank,
              name: currency.name,
              ticker: currency.ticker,
              marketCapUsd: Math.round(currency.market_cap_usd),
              priceUsd: currency.price_usd,
              pricePercentChange24h: currency.percent_change_24h,
              pricePercentChange7d: currency.percent_change_7d,
              trendPercentChange7d: '-',
              startDate: '-',
              endDate: '-'
            }
          }

        })
    }))
}

getCurrencies.then(currencies => {
  for (let currency in currencies) {
    router.get(`/${currency}/daily`, generateDailyTrendMiddleware(currency, currencies[currency].search))
  }

  for (let currency in currencies) {
    router.get(`/${currency}/years`, generateTwoYearTrendMiddleware(currency, currencies[currency].search))
  }
})



router.get('/growth/weekly', (req, res, next) => {
  return GoogleTrend.findOne({ where: { id: 'growth1W' } })
    .then(growth => {
      if (!growth) {
        fetchAllCoinStats()
          .then(data => {
            res.send(_.keyBy(data, 'ticker'));
            return GoogleTrend.create({
              id: 'growth1W',
              interval: '1W',
              trend: _.keyBy(data, 'ticker'),
              timestamp: moment().format('X')
            })
          })
        .catch(next)
      } else {
        const needUpdate = growth ?
          parseInt(moment().subtract(3, 'days').format('YYYYMMDDHH')) >=
          parseInt(moment.unix(growth.timestamp).format('YYYYMMDDHH')) : null;
        if (needUpdate) {
          fetchAllCoinStats()
            .then(data => {
              res.send(_.keyBy(data, 'ticker'));
              return growth.update({
                trend: _.keyBy(data, 'ticker'),
                timestamp: moment().format('X')
              })
            })
          .catch(next)
        } else {
          res.send(growth.trend)
        }
      }
    }).catch(next)
})

router.get('/compare/years', (req, res, next) => {
  const queryStartDate = new Date(moment().subtract(3, 'months'))
  const queryEndDate = new Date(Date.now())
  const range = moment.range(queryStartDate, queryEndDate)
  return GoogleTrend.findOne({ where: { id: 'ALL', interval: '2Y' } })
    .then(all => {
      const needUpdate = all ?
        parseInt(moment().subtract(1, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(all.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        var topThree, keyword;
        getCurrencies.then(currencies => {
          topThree = _.keys(currencies).slice(0, 3)
          keyword = topThree.map(coin => coin.search)
          return googleTrendsOverTimePromise({
              keyword: keyword,
              startTime: queryStartDate,
              endTime: queryEndDate
            }).then(response => {
              if (!response) throw new Error('no response')
              const googleTrends = JSON.parse(response).default.timelineData.map(datum => {
                var response = {
                  date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD')
                }
                for (var i = 0; i < 10; i++) {
                  response[topThree[i]] = datum.value[1]
                }
                return response
              }).filter(trend => {
                return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
              });
              res.send(googleTrends)
              return all.update({
                trend: googleTrends,
                timestamp: moment().format('X')
              })
            })
            .catch(next)
        })
      } else {
        res.send(all.trend)
        return all
      }
    }).catch(next);
})
