const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userDb) {
    this.userDb = userDb
  }

  async update (userId, accessToken) {
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
})
