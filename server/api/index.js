const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/articles', require('./articles'))
router.use('/google-trends', require('./google-trends'))
router.use('/ether', require('./ether'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
