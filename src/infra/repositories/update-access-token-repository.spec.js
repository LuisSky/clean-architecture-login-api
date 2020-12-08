const { MissingParamsError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userDb) {
    this.userDb = userDb
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamsError('userId')
    }
    if (!accessToken) {
      throw new MissingParamsError('accessToken')
    }
    await this.userDb.updateOne(
      { _id: userId }
      , {
        $set: {
          accessToken
        }
      })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('UpdateAccessTokenRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()

    const fakeUser = await userModel.insertOne({
      email: 'valid_mail@mail.com',
      password: 'hashed_pass',
      name: 'any',
      age: 50,
      gender: 'm'
    })

    await sut.update(fakeUser.ops[0]._id, 'any_token')

    const userUpdated = await userModel.findOne({ _id: fakeUser.ops[0]._id })

    expect(userUpdated.accessToken).toBe('any_token')
  })

  test('Should throw if no userDb is provided', () => {
    const sut = new UpdateAccessTokenRepository()
    const promise = sut.update('any_id', 'any_token')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', () => {
    const { sut } = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamsError('userId'))
    expect(sut.update('any_id')).rejects.toThrow(new MissingParamsError('accessToken'))
  })
})
