module.exports = class InvalidParamsError extends Error {
  constructor (paramName) {
    super(`Invalid params error ${paramName}`)
    this.name = paramName
  }
}
