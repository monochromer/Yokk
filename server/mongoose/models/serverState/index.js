'use strict'

module.exports = function(app, mongoose) {
  var serverState = new mongoose.Schema({
    login: {
      type: String
    },
    numberOfDocsToSkip: Number,
    numberOfDocsToReturn: Number,
  });


  app.db.model('ServerState', serverState);
}
