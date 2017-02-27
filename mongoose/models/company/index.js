'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
    var companySchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true
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
        teams: Array
    });

    methods(companySchema);
    statics(companySchema);

    app.db.model('Company', companySchema);
}
