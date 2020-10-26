const { MissingParamsError } = require('../../utils/errors')

class AuthUseCase {
  constructor (LoadUserByEmailRepository) {
    this.loadUserByEmailRepository = LoadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamsError('email')
    }
    if (!password) {
      throw new MissingParamsError('password')
    }
    await this.loadUserByEmailRepository.load(email)
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamsError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamsError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct params', async () => {
    class LoadUserByEmailRepositorySpy {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepository = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepository)

    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRepository.email).toBe('any_email@mail.com')
  })
})
