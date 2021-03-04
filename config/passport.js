const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  User.findOne({ email: email }).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, { error: 'E-mail ou senha inválidos' })
    }

    return done(null, user)
  }).catch(done)
}))
