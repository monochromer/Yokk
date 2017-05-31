'use strict'

module.exports = function(app, mongoose) {
  var notificationSchema = new mongoose.Schema({
    text: String,
    targetType: String,
    targetId: mongoose.Schema.Types.ObjectId,
    new: {
      type: Boolean,
      default: true
    },
    date: {
      type: Number,
      default: Date.now
    },
    userId: mongoose.Schema.Types.ObjectId,
    companyId: mongoose.Schema.Types.ObjectId
  });

  app.db.model('Notification', notificationSchema);
}
