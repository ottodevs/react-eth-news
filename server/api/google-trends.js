const router = require('express').Router();
const googleTrends = require('google-trends-api');
const Promise = require('bluebird');
const moment = require('moment')
const googleTrendsOverTimePromise = Promise.promisify(googleTrends.interestOverTime)
module.exports = router


router.get('/', (req, res, next) => {
  const startDate = new Date(moment('Jul 01, 2015', 'MMM DD, YYYY'))
  const endDate =  new Date(Date.now())
  googleTrendsOverTimePromise({
    keyword: 'ethereum',
    startTime: startDate,
    endTime: endDate
  }).then(googleTrends => {
    res.send(googleTrends);
    return googleTrends
  })
})
