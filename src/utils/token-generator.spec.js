const jwt = require('jsonwebtoken')
const { MissingParamsError } = require('./errors')
class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    if (!this.secret) {
      throw new MissingParamsError('secret')
    }
    if (!id) {
      throw new MissingParamsError('id')
    }
    return jwt.sign(id, this.secret)
  }
}

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('TokenGenerator', () => {
  test('Should return null if JWT return null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return token if JWT returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(jwt.token).toBe(token)
  })

  test('Should calls JWT with correct params', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(jwt.id).toBe('any_id')
    expect(jwt.token).toBe(token)
  })

  test('Should return throw if no secret is provided', async () => {
    const sut = new TokenGenerator()
    const promisse = sut.generate('any_id')
    expect(promisse).rejects.toThrow(new MissingParamsError('secret'))
  })

  test('Should return throw if no id is provided', async () => {
    const sut = makeSut()
    const promisse = sut.generate()
    expect(promisse).rejects.toThrow(new MissingParamsError('id'))
  })
})
