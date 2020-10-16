const httpResponse = require('./helpers/http-response.js')
const { MissingParamsError, InvalidParamsError } = require('./errors')

module.exports = class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return httpResponse.badRequest(new MissingParamsError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return httpResponse.badRequest(new InvalidParamsError('email'))
      }
      if (!password) {
        return httpResponse.badRequest(new MissingParamsError('password'))
      }

      const acessToken = this.authUseCase.auth(email, password)
      if (!acessToken) {
        return httpResponse.unauthorizedError()
      }
      return httpResponse.ok(acessToken)
    } catch (err) {
      return httpResponse.serverError()
    }
  }
}
