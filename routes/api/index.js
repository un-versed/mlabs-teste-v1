const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/parkings', require('./parkings'))

module.exports = router
