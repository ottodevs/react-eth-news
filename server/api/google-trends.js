const router = require('express').Router();
const googleTrends = require('google-trends-api');
const Promise = require('bluebird');
const Moment = require('moment');
const extendMoment = require('moment-range').extendMoment;
const moment = extendMoment(Moment);
const interpolateLineRange = require('line-interpolate-points')
const googleTrendsOverTimePromise = Promise.promisify(googleTrends.interestOverTime)
module.exports = router

const interpolate = function(data) {
  var prevTime = undefined;
  var prevValue = undefined;
  var interpolatedData = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var curTime = item.date;
    var curVal = item.value;

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
          value: interpolation[j][1]
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
  for (i = 0; i < data.length; i = i + interval) {
    dataInNthInterval.push(data[i]);
  }
  return dataInNthInterval
}

router.get('/', (req, res, next) => {
  const queryStartDate = new Date(moment('Jun 25, 2015', 'MMM DD, YYYY'))
  const queryEndDate = new Date(Date.now())
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'))
  const range = moment.range(sysStartDate, queryEndDate)
  googleTrendsOverTimePromise({
    keyword: 'ethereum',
    startTime: queryStartDate,
    endTime: queryEndDate
  }).then(response => {
    const googleTrends = JSON.parse(response).default.timelineData.map(datum => {
      return {
        date: moment(datum.formattedAxisTime, 'MMM DD, YYYY').format('YYYY-MM-DD'),
        value: datum.value[0]
      }
    }).filter(trend => {
      return range.contains(moment(trend.date, 'YYYY-MM-DD'), { exclusive: false })
    });
    const interpolated = interpolate(googleTrends);
    const googleTrendsEveryThreeDays = getDataInNthInterval(interpolated, 3)
    res.send(googleTrendsEveryThreeDays);
    return response
  })
})
