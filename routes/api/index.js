const router = require('express').Router()

router.get('/', (req, res, next) => {
  return res.json({ teste: 'mLabs' })
})

module.exports = router
