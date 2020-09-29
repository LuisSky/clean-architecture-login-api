const MissingParamsError = require('./missing-param-error.js')
const UnauthorizedError = require('./unauthorized-error.js')

module.exports = class httpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamsError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }
}
