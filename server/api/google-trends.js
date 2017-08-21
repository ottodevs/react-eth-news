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

router.get('/eth', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)
  return GoogleTrend.findById('eth')
    .then(eth => {
      const needUpdate = eth ?
        parseInt(moment().subtract(7, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(eth.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        googleTrendsOverTimePromise({
          keyword: 'ethereum',
          startTime: queryStartDate,
          endTime: queryEndDate
        }).then(response => {
          const googleTrends = interpolate(JSON.parse(response).default.timelineData.map(datum => {
            return {
              date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
              googleTrends: datum.value[0]
            }
          }), moment(queryEndDate)).filter(trend => {
            return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          const googleTrendsEveryThreeDays = getDataInNthInterval(googleTrends, 3)
          res.send(googleTrendsEveryThreeDays);
          return eth.update({
            trend: googleTrendsEveryThreeDays,
            timestamp: moment().format('X')
          })
        })
      } else {
        res.send(eth.trend)
        return eth
      }
    })

})

router.get('/btc', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)

  return GoogleTrend.findById('btc')
    .then(btc => {
      const needUpdate = btc ?
        parseInt(moment().subtract(7, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(btc.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        googleTrendsOverTimePromise({
          keyword: 'bitcoin',
          startTime: queryStartDate,
          endTime: queryEndDate
        }).then(response => {
          const googleTrends = interpolate(JSON.parse(response).default.timelineData.map(datum => {
            return {
              date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
              googleTrends: datum.value[0]
            }
          }), moment(queryEndDate)).filter(trend => {
            return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          const googleTrendsEveryThreeDays = getDataInNthInterval(googleTrends, 3)
          res.send(googleTrendsEveryThreeDays);
          return btc.update({
            trend: googleTrendsEveryThreeDays,
            timestamp: moment().format('X')
          })
        })
      } else {
        res.send(btc.trend)
        return btc
      }
    })

})

router.get('/xrp', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)
  return GoogleTrend.findById('xrp')
    .then(xrp => {
      const needUpdate = xrp ?
        parseInt(moment().subtract(7, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(xrp.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        googleTrendsOverTimePromise({
          keyword: 'ripple',
          startTime: queryStartDate,
          endTime: queryEndDate
        }).then(response => {
          const googleTrends = interpolate(JSON.parse(response).default.timelineData.map(datum => {
            return {
              date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
              googleTrends: datum.value[0]
            }
          }), moment(queryEndDate)).filter(trend => {
            return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          const googleTrendsEveryThreeDays = getDataInNthInterval(googleTrends, 3)
          res.send(googleTrendsEveryThreeDays);
          return xrp.update({
            trend: googleTrendsEveryThreeDays,
            timestamp: moment().format('X')
          })
        })
      } else {
        res.send(xrp.trend)
        return xrp
      }
    })
})

router.get('/xem', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)
  return GoogleTrend.findById('xem')
    .then(xem => {
      const needUpdate = xem ?
        parseInt(moment().subtract(7, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(xem.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        googleTrendsOverTimePromise({
          keyword: 'NEM blockchain',
          startTime: queryStartDate,
          endTime: queryEndDate
        }).then(response => {
          const googleTrends = interpolate(JSON.parse(response).default.timelineData.map(datum => {
            return {
              date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
              googleTrends: datum.value[0]
            }
          }), moment(queryEndDate)).filter(trend => {
            return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          const googleTrendsEveryThreeDays = getDataInNthInterval(googleTrends, 3)
          res.send(googleTrendsEveryThreeDays);
          return xem.update({
            trend: googleTrendsEveryThreeDays,
            timestamp: moment().format('X')
          })
        })
      } else {
        res.send(xem.trend)
        return xem
      }
    })
})

router.get('/ltc', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)
  return GoogleTrend.findById('ltc')
    .then(ltc => {
      const needUpdate = ltc ?
        parseInt(moment().subtract(7, 'days').format('YYYYMMDD')) >=
        parseInt(moment.unix(ltc.timestamp).format('YYYYMMDD')) : null;
      if (needUpdate) {
        googleTrendsOverTimePromise({
          keyword: 'NEM blockchain',
          startTime: queryStartDate,
          endTime: queryEndDate
        }).then(response => {
          const googleTrends = interpolate(JSON.parse(response).default.timelineData.map(datum => {
            return {
              date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
              googleTrends: datum.value[0]
            }
          }), moment(queryEndDate)).filter(trend => {
            return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
          });
          const googleTrendsEveryThreeDays = getDataInNthInterval(googleTrends, 3)
          res.send(googleTrendsEveryThreeDays);
          return ltc.update({
            trend: googleTrendsEveryThreeDays,
            timestamp: moment().format('X')
          })
        })
      } else {
        res.send(ltc.trend)
        return ltc
      }
    })
})
