const env = process.env
const isProduction = env === 'production'

module.exports = (err, req, res, next) => {
  // Check for specific errors
  // Validation errors
  if (err.name === 'JoiValidationError') {
    return res.status(422).send({ error: err.message.replace(/"/g, ''), code: 'E_VALIDATION' })
  }

  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: Object.keys(err.errors).reduce((error, key) => {
        error[key] = err.errors[key].message

        return error
      }, {})
    })
  }

  if (!isProduction) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      message: err.message,
      error: err
    })
  } else {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: {}
    })
  }
}
