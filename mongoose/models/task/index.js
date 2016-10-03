'use strict'

var statics = require('./statics');

module.exports = function(app, mongoose) {
    var taskSchema = new mongoose.Schema({
        taskNumber: Number,
        executor: {
            type: String,
            required: true
        },
        dateAdded: {
            type: Date,
            default: Date.now
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            required: true
        },
        minutesSpent: Number,
        taskSource: {
            type: String,
            required: true
        }
    });

    statics(taskSchema);

    app.db.model('tasks', taskSchema);
}
