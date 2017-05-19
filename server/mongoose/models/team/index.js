'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
  var teamSchema = new mongoose.Schema({
    name: String,
    created: {
      type: Number,
      default: Date.now
    },
    members: [{
      userId: mongoose.Schema.Types.ObjectId,
      manager: {
        type: Boolean,
        default: false
      }
    }],
    companyId: mongoose.Schema.Types.ObjectId
  });

  methods(teamSchema);
  statics(teamSchema);

  app.db.model('Team', teamSchema);
}
