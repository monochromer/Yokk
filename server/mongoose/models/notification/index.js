'use strict'

module.exports = function(app, mongoose) {
  var notificationSchema = new mongoose.Schema({
    text: String,
    link: String,
    new: {
      type: Boolean,
      default: true
    },
    date: {
      type: Number,
      default: Date.now
    }
  });

  app.db.model('Notification', notificationSchema);
}
