const router = require('express').Router()

router.use('/api', require('./api'))

// Root route
router.get('/', (req, res, next) => {
  return res.json({ title: 'mLabs Teste API v1' })
})

module.exports = router
