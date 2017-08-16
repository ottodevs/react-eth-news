const router = require('express').Router();
const { Article } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  Article.findAll({
      attributes: ['id', 'title', 'source', 'link', 'date', 'type']
    })
    .then(articles => {
      res.send(articles)
      return articles
    })
    .catch(next)
})

router.get('/count', (req, res, next) => {
  Article.findAll({
      attributes: ['id', 'source', 'date', 'type']
    })
    .then(articles => {
      const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'));
      const systemInterval = [3, 'days'];
      sorted = _.sortBy(articles, [function (o) {return new Date(o.date)}]);
      res.send(articles)
      return articles
    })
    .catch(next)
})
