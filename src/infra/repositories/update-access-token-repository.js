const { MissingParamsError } = require('../../utils/errors')

module.exports = class UpdateAccessTokenRepository {
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
