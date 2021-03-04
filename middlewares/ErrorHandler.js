const env = process.env
const isProduction = env === 'production'

module.exports = (err, req, res, next) => {
  // Check for specific errors
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(422).send({ error: err.details[0].message.replace(/"/g, ''), code: 'E_VALIDATION' })
  }

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
