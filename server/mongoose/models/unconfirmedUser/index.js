'use strict'

module.exports = function (app, mongoose) {
  const userSchema = new mongoose.Schema({
    email: String,
    teamId: mongoose.Schema.Types.ObjectId,
    role: String
  })

  app.db.model('unconfirmedUser', userSchema)
}
