const PLATE_REGEX = /^[a-zA-Z]{3}-[0-9]{4}\b/

module.exports = (value, helpers) => {
  if (PLATE_REGEX.test(value)) {
    return value
  } else {
    return helpers.error('plate.base')
  }
}
