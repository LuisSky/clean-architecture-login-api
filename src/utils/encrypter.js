const bcrypt = require('bcrypt')
const { MissingParamsError } = require('./errors')

module.exports = class Encrypter {
  async compare (value, hash) {
    if (!value) {
      throw new MissingParamsError('value')
    }
    if (!hash) {
      throw new MissingParamsError('hash')
    }
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
