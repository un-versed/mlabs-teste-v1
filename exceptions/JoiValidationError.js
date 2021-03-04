/* eslint-disable space-before-function-paren */
class JoiValidationError extends Error {
  constructor(message = '', ...args) {
    super(message, ...args)
    this.message = message
    this.name = 'JoiValidationError'
  }
}

module.exports = JoiValidationError
