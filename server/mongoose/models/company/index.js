'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
  var companySchema = new mongoose.Schema({
    name: {
      type: String,
      uniq: true
    },
    originatorEmail: {
      type: String,
      required: true
    },
    confirmationCode: String,
    emailConfirmed: {
      type: Boolean,
      default: false
    },
    address: String,
    billingInfo: String,
    created: {
      type: Number,
      default: Date.now
    },
    codeSentDate: Number,
    codeTries: Number
  });

  methods(companySchema);
  statics(companySchema);

  app.db.model('Company', companySchema);
}
