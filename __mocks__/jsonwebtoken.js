module.exports = {
  token: 'any_token',
  id: '',
  async sign (id, secret) {
    this.id = id
    return this.token
  }
}
