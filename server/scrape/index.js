const myGoogleNews = require('./my-google-news'),
  db = require('../db'),
  Promise = require('bluebird'),
  moment = require('moment'),
  CronJob = require('cron').CronJob;
const Article = db.model('article'),
  sourceType = JSON.parse(JSON.stringify(require('./source-type')));

myGoogleNews.resultsPerPage = 25; // max 100
var googleQuery = 'ethereum'; //search Query
var googleNewsPromise = Promise.promisify(myGoogleNews);
var scrapeGoogleNews = () => {
  console.log('start scraping')
  return googleNewsPromise(googleQuery, 1)
    .then(res => {
      return Promise.map(res.links, function(item) {
        let sourceWithSpecialChar = encodeURIComponent(item.source.trim()),
          source = decodeURIComponent(
            sourceWithSpecialChar.substr(0, sourceWithSpecialChar.length - 9));
        return Article.findOrCreate({
          where: {
            title: item.title.toLowerCase()
          }
        }).spread((news, created) => {
          const timestamp = moment(item.date.trim()).unix()
          if (created) {
            return news.update({
              link: item.link,
              source: item.source.trim(),
              date: timestamp,
              type: sourceType[source.trim()]
            });
          }
          return news;
        });
      });
    })
    .then(() => {
      console.log(moment().format('HH:mm MMM DD, YYYY'), 'finished scraping');
    })
    .catch(err => console.error(err));
};

var dailyScrape = new CronJob({
    cronTime: '00 00 0-23/4 * * *',
    onTick: function() {
      scrapeGoogleNews();
    },
    start: true,
    timeZone: 'America/New_York'
  });

console.log('schdule daily scraping')
module.exports = {
  scrapeGoogleNews: scrapeGoogleNews,
  dailyScrape: dailyScrape
}
