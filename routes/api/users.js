const router = require('express').Router()
const UserController = require('../../controllers/Http/User')
const auth = require('../auth')

router.put('/', auth.required, UserController.update)

router.get('/', auth.required, UserController.currentUser)

router.post('/login', UserController.auth)

router.post('/', UserController.register)

module.exports = router
