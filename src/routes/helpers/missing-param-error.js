module.exports = class MissingParamsError extends Error {
  constructor (paramName) {
    super(`Missing param error ${paramName}`)
    this.name = paramName
  }
}
