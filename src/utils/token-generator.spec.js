const jwt = require('jsonwebtoken')

class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}

const makeSut = () => {
  return new TokenGenerator()
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
})
