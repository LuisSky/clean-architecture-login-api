const httpResponse = require('./helpers/http-response.js')
const MissingParamsError = require('./helpers/missing-param-error.js')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return httpResponse.badRequest(new MissingParamsError('email'))
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
