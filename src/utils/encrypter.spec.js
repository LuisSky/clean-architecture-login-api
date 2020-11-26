const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const { MissingParamsError } = require('./errors')

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

  test('Should calls bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('value', 'hashed_value')
    expect(bcrypt.value).toBe('value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamsError('value'))
    expect(sut.compare('value')).rejects.toThrow(new MissingParamsError('hash'))
  })
})
