'use strict'

module.exports = function (app, mongoose) {
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    teamId: {
      type: String,
      unique: true,
      required: true
    }
  })

  app.db.model('unconfirmedUser', userSchema)
}
