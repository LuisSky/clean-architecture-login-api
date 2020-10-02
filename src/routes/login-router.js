const httpResponse = require('./helpers/http-response.js')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return httpResponse.badRequest('email')
      }
      if (!password) {
        return httpResponse.badRequest('password')
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
