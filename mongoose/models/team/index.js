'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
    var teamSchema = new mongoose.Schema({
        name: {
            type: String,
            uniq: true,
            required: true
        },
        teamLead: String,
        teamLogo: String,
        created: {
            type: Date,
            default: Date.now
        }
    });

    methods(teamSchema);
    statics(teamSchema);

    app.db.model('Team', teamSchema);
}
