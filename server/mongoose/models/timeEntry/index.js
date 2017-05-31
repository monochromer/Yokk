'use strict'

var statics = require('./statics');

module.exports = function(app, mongoose) {
  var timeEntry = new mongoose.Schema({
    number: Number,
    redmineId: Number,
    executor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    date: {
      type: Number,
      default: Date.now
    },
    dateCreated: {
      type: Number,
      default: Date.now
    },
    description: {
      type: String,
      required: true
    },
    duration: Number,
    entrySource: {
      type: String,
      required: true
    }
  });

  // statics(timeEntry);

  app.db.model('timeEntry', timeEntry);
}
