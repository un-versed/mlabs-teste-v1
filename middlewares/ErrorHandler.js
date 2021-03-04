const env = process.env
const isProduction = env === 'production'

module.exports = (err, req, res, next) => {
  // Check for specific errors
  if (!isProduction) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  } else {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message,
        error: {}
      }
    })
  }
}
