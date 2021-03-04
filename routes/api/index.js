const router = require('express').Router()

/**
 * api/users/*
 */
router.use('/users', require('./users'))
/**
 * api/parkings/*
 */
router.use('/parkings', require('./parkings'))

module.exports = router
