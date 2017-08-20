const router = require('express').Router();
const googleTrends = require('google-trends-api');
const Promise = require('bluebird');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
const interpolateLineRange = require('line-interpolate-points')
const googleTrendsOverTimePromise = Promise.promisify(googleTrends.interestOverTime)
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
      console.log(prevValue, curVal)
      // exit loop until prevTime === curTime
      var step = moment(prevTime).add(1, 'd');
      var interpolation = interpolateLineRange([
        [0, Number(prevValue)],
        [3, Number(curVal)]
      ], 8);
      console.log(interpolation)
      var j = 0;
      while (step.format('YYYY-MM-DD') !== curTime) {
        console.log(j, curTime, step.format('YYYY-MM-DD'), prevTime)
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
    return response
  })
})

router.get('/btc', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)
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
    return response
  })
})
