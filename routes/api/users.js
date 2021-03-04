const router = require('express').Router()
const UserController = require('./../../controllers/Http/User')
const auth = require('../auth')

router.put('/user', auth.required, UserController.update)

router.get('/user', auth.required, UserController.currentUser)

router.post('/users/login', UserController.auth)

router.post('/users', UserController.register)

module.exports = router
