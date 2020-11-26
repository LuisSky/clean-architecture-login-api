const bcrypt = require('bcrypt')

class Encrypter {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

const makeSut = () => {
  const encrypter = new Encrypter()
  encrypter.isValid = true
  return encrypter
}

describe('Encrypter', () => {
  test('Should return true if compare return true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('Should return false if compare return false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('value', 'hashed_value')
    expect(isValid).toBe(false)
  })
})
