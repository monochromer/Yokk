'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
  var companySchema = new mongoose.Schema({
    name: {
      type: String,
      uniq: true
    },
    originator: String,
    originatorEmail: {
      type: String,
      required: true
    },
    confirmationCode: String,
    emailConfirmed: {
      type: Boolean,
      default: false
    },
    companyLogoURL: String,
    created: {
      type: Date,
      default: Date.now
    },
    teams: Array,
    codeSentDate: Date,
    codeTries: Number
  });

  methods(companySchema);
  statics(companySchema);

  app.db.model('Company', companySchema);
}
