const { MissingParamsError, InvalidParamsError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypter, tokenGenerator) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamsError('email')
    }
    if (!password) {
      throw new MissingParamsError('password')
    }
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamsError('loadUserByEmailRepository')
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamsError('loadUserByEmailRepository')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      return null
    }
    const isValid = await this.encrypter.compare(password, user.password)
    if (!isValid) {
      return null
    }
    const acessToken = await this.tokenGenerator.generate(user.id)
    return acessToken
  }
}
