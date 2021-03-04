const router = require('express').Router()
const UserController = require('../../controllers/Http/User')
const auth = require('../auth')

/**
 * Register User
 * POST users
 */
router.post('/', UserController.register)
/**
 * Auth User
 * POST users/login
 */
router.post('/login', UserController.auth)
/**
 * Update User
 * PUT users
 */
router.put('/', auth.required, UserController.update)
/**
 * Get Current User
 * GET users
 */
router.get('/', auth.required, UserController.currentUser)

module.exports = router
