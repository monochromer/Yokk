'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
  var teamSchema = new mongoose.Schema({
    name: String,
    teamOriginator: mongoose.Schema.Types.ObjectId,
    teamLogoURL: String,
    created: {
      type: Number,
      default: Date.now
    },
    members: Array
  });

  methods(teamSchema);
  statics(teamSchema);

  app.db.model('Team', teamSchema);
}
