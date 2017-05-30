'use strict'

module.exports = function (app, mongoose) {
  const userSchema = new mongoose.Schema({
    email: String,
    teamId: mongoose.Schema.Types.ObjectId,
    companyId: mongoose.Schema.Types.ObjectId,
    role: String
  })

  userSchema.index({ email: 1, companyId: 1}, { unique: true });

  app.db.model('UnconfirmedUser', userSchema)
}
