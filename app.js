// Require dotenv-safe for env examples
require('dotenv-safe').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const errorhandler = require('errorhandler')
const globalErrorHandler = require('./middlewares/ErrorHandler')
const mongoose = require('mongoose')
const env = process.env
const isProduction = env === 'production'

// Create global app object
const app = express()

// Set CORS permissions
app.use(cors())

// Normal express config defaults
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('method-override')())
app.use(express.static(path.join(__dirname, '/public')))
app.use(session({ secret: 'secretMlabs', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

// Check if is production
if (!isProduction) {
  app.use(errorhandler())
}

// Select which database to use
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI)
} else if (env.NODE_ENV === 'testing') {
  mongoose.connect('mongodb://localhost/mlabs-teste-jest', { useUnifiedTopology: true, useNewUrlParser: true })
} else {
  mongoose.connect('mongodb://localhost/mlabs-teste', { useUnifiedTopology: true, useNewUrlParser: true })
}

// Pre Load Models
require('./models/User')
require('./models/Parking')
// Config
require('./config/passport')
// Route files
app.use(require('./routes'))

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Global Exception Handler
app.use(globalErrorHandler)

module.exports = app
