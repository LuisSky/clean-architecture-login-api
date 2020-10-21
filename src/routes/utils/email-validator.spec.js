const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('EmailValidator test', () => {
  test('Should return true if valid email provider', () => {
    const sut = makeSut()
    const isValidEmail = sut.isValid('valid_email@mail.com')
    expect(isValidEmail).toBe(true)
  })

  test('Should return false if invalid email provider', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isValidEmail = sut.isValid('invalid_email@mail.com')
    expect(isValidEmail).toBe(false)
  })

  test('Should call validator whit correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')

    expect(validator.email).toBe('any_email@mail.com')
  })
})
