const Joi = require('joi')
const JoiValidationError = require('./../../exceptions/JoiValidationError')
const options = {
  messages: require('./language')
}

class Validator {
  constructor(schema) { //eslint-disable-line
    this.schema = Joi.object(schema, options)
  }

  validate (request, response, next) {
    const result = this.schema.validate(request.body, options)
    if (result.error) {
      throw new JoiValidationError(result.error.message)
    }
  }
}

module.exports = Validator
