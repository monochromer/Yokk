'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
    var teamSchema = new mongoose.Schema({
        name: {
            type: String,
            uniq: true
        },
        teamLead: String,
        teamLeadEmail: {
            type: String,
            required: true
        },
        confirmationCode: String,
        confirmed: {
            type: Boolean,
            default: false
        },
        teamLogoURL: String,
        created: {
            type: Date,
            default: Date.now
        },
        members: Array
    });

    methods(teamSchema);
    statics(teamSchema);

    app.db.model('Team', teamSchema);
}
