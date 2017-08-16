const router = require('express').Router();
const { Article } = require('../db/models');
module.exports = router

router.get('/:start/:end', (req, res, next) => {
  Article.findAll({
      attributes: ['id', 'title', 'source', 'link', 'date', 'type'],
      where: {
        date: {
          $between: [req.params.start, req.params.end]
        }
      }
    })
    .then(articles => {
      res.send(articles)
      return articles
    })
    .catch(next)
})

router.get('/count', (req, res, next) => {
  Article.findAll({
      attributes: ['id', 'source', 'date', 'type'],
    })
    .then(articles => {
      res.send(articles)
      return articles
    })
    .catch(next)
})
