const httpResponse = require('./helpers/http-response.js')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return httpResponse.serverError()
    }

    const { email, password } = httpRequest.body

    if (!email) {
      return httpResponse.badRequest('email')
    }
    if (!password) {
      return httpResponse.badRequest('password')
    }
    this.authUseCase.auth(email)

    return httpResponse.unauthorizedError()
  }
}
