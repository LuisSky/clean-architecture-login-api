
class EmailValidator {
  isValid (email) {
    return true
  }
}
describe('EmailValidator test', () => {
  test('Should return true if valid email provider', () => {
    const sut = new EmailValidator()
    const isValidEmail = sut.isValid('valid_email@mail.com')
    expect(isValidEmail).toBe(true)
  })
})
