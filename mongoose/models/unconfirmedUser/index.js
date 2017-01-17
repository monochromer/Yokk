'use strict'

module.exports = function (app, mongoose) {
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      uniq: true,
      required: true
    },
    teamId: {
      type: String,
      uniq: true,
      required: true
    }
  })

  app.db.model('unconfirmedUser', userSchema)
}
