/**
 * Resourceful controller for interacting with USERS
 */
const passport = require('passport')
const Validator = require('./../../services/Validator')
const Joi = require('joi')
const mongoose = require('mongoose')
const User = mongoose.model('User')

class UserController {
  /**
   * Get Current User
   * GET users
   */
  async currentUser (req, res, next) {
    try {
      const user = await User.findById(req.payload.id)

      if (!user) { return res.sendStatus(401) }
      return res.json(user.toAuthJSON())
    } catch (error) {
      next(error)
    }
  }

  /**
   * Auth User
   * POST users/login
   */
  async auth (req, res, next) {
    try {
      new Validator({
        email: Joi.string().email().required().label('E-mail'),
        password: Joi.string().min(3).required().label('Senha')
      }).validate(req, res, next)

      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) { return next(err) }
        if (user) {
          user.token = user.generateJWT()
          return res.json(user.toAuthJSON())
        } else {
          return res.status(401).json(info)
        }
      })(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Register User
   * POST users
   */
  async register (req, res, next) {
    try {
      new Validator({
        email: Joi.string().email().required().label('E-mail'),
        password: Joi.string().min(3).required().label('Senha'),
        username: Joi.string().min(3).required().label('Nome de usuário')
      }).validate(req, res, next)

      const { email, password, username } = req.body
      const user = new User({ email, username })

      user.setPassword(password)
      await user.save()

      return res.json(user.toAuthJSON())
    } catch (error) {
      next(error)
    }
  }

  /**
   * Update User
   * PUT users
   */
  async update (req, res, next) {
    try {
      new Validator({
        password: Joi.string().min(3).allow(null).label('Senha'),
        username: Joi.string().min(3).label('Nome de usuário')
      }).validate(req, res, next)

      const { password, username } = req.body

      const user = await User.findById(req.payload.id)

      // If password, creates new hash
      if (password) {
        user.setPassword(password)
      }

      user.username = username

      await user.save()
      return res.json(user.toAuthJSON())
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
