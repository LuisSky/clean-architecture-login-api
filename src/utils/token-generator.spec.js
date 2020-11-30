const jwt = require('jsonwebtoken')

class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}

describe('TokenGenerator', () => {
  test('Should return null if JWT return null', async () => {
    const sut = new TokenGenerator()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return token if JWT returns token', async () => {
    const sut = new TokenGenerator()
    const token = await sut.generate('any_id')
    expect(jwt.token).toBe(token)
  })
})
