const { MissingParamsError, InvalidParamsError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, encrypter, tokenGenerator, updateAcessTokenRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
    this.updateAcessTokenRepository = updateAcessTokenRepository
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

    const isValid = user && await this.encrypter.compare(password, user.password)
    if (isValid) {
      const acessToken = await this.tokenGenerator.generate(user.id)
      await this.updateAcessTokenRepository.update(user.id, acessToken)
      return acessToken
    }
    return null
  }
}
