'use strict'

var statics = require('./statics');

module.exports = function(app, mongoose) {
    var timeEntry = new mongoose.Schema({
        number: Number,
        redmineId: Number,
        executor: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        dateCreated: {
            type: Date,
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
