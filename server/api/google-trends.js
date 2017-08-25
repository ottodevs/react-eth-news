const router = require('express').Router();
const googleTrends = require('google-trends-api');
const Promise = require('bluebird');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
const interpolateLineRange = require('line-interpolate-points')
const googleTrendsOverTimePromise = Promise.promisify(googleTrends.interestOverTime)
const { GoogleTrend } = require('../db/models');
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

  if (moment(prevTime).format('YYYY-MM-DD') !== queryEndDate.format('YYYY-MM-DD')) {
    interpolatedData.push({
      date: moment(prevTime).add(3, 'd'),
      googleTrends: prevValue
    });
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
            parseInt(moment().subtract(1, 'days').format('YYYYMMDD')) >=
            parseInt(moment.unix(currency.timestamp).format('YYYYMMDD')) : null;
          if (needUpdate) {
            fetchDailyGoogleTrends(searchTerm, startDate, currentDate)
              .then(timeseries => {
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
          fetchDailyGoogleTrends(searchTerm, startDate, currentDate)
            .then(timeseries => {
              res.send(timeseries);
              return GoogleTrend.create({
                id: ticker + '1D',
                interval: '1D',
                trend: timeseries,
                timestamp: moment().format('X')

              })
            })
        }



      })




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
            parseInt(moment().subtract(1, 'days').format('YYYYMMDD')) >=
            parseInt(moment.unix(currency.timestamp).format('YYYYMMDD')) : null;
          if (needUpdate) {
            fetchTwoYearsGoogleTrends(searchTerm, queryStartDate, queryEndDate, range)
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
          fetchTwoYearsGoogleTrends(searchTerm, queryStartDate, queryEndDate, range)
            .then(googleTrends => {
              const googleTrendsEveryThreeDays = getDataInNthInterval(googleTrends, 3)
              res.send(googleTrendsEveryThreeDays);
              return GoogleTrend.create({
                id: ticker + '2Y',
                interval: '2Y',
                interval: '2Y',
                trend: googleTrendsEveryThreeDays,
                timestamp: moment().format('X')
              })
            })
        }




      })

  }
}

router.get('/eth/daily', generateDailyTrendMiddleware('eth', 'ethereum'))
router.get('/btc/daily', generateDailyTrendMiddleware('btc', 'bitcoin'))
router.get('/xrp/daily', generateDailyTrendMiddleware('xrp', 'ripple'))
router.get('/xem/daily', generateDailyTrendMiddleware('xem', 'NEM XEM'))
router.get('/ltc/daily', generateDailyTrendMiddleware('ltc', 'litecoin'))
router.get('/bch/daily', generateDailyTrendMiddleware('bch', 'bitcoin cash'))
router.get('/miota/daily', generateDailyTrendMiddleware('miota', 'IOTA'))


router.get('/eth/years', generateTwoYearTrendMiddleware('eth', 'ethereum'))
router.get('/btc/years', generateTwoYearTrendMiddleware('btc', 'bitcoin'))
router.get('/xrp/years', generateTwoYearTrendMiddleware('xrp', 'ripple'))
router.get('/xem/years', generateTwoYearTrendMiddleware('xem', 'NEM XEM'))
router.get('/ltc/years', generateTwoYearTrendMiddleware('ltc', 'litecoin'))

router.get('/compare/years', (req, res, next) => {
  const queryStartDate = new Date(moment().subtract(2, 'years'))
  const queryEndDate = new Date(Date.now())
  const range = moment.range(queryStartDate, queryEndDate)
  return GoogleTrend.findOne({ where: { id: 'all', interval: '2Y' } })
    .then(all => {
      const needUpdate = all ?
        parseInt(moment().subtract(1, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(all.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        googleTrendsOverTimePromise({
          keyword: ['ethereum', 'bitcoin', 'ripple', 'litecoin', 'NEM coin'],
          startTime: queryStartDate,
          endTime: queryEndDate
        }).then(response => {
          const googleTrends = JSON.parse(response).default.timelineData.map(datum => {
            return {
              date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
              eth: datum.value[0],
              btc: datum.value[1],
              xrp: datum.value[2],
              ltc: datum.value[3],
              xem: datum.value[4]
            }
          }).filter(trend => {
            return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          res.send(googleTrends)
          return all.update({
            trend: googleTrends,
            timestamp: moment().format('X')
          })
        })

      } else {
        res.send(all.trend)
        return all
      }
    })
})
