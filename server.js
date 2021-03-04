const app = require('./app')
const env = process.env

// Server starting
const server = app.listen(env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port)
})
