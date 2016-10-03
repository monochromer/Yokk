'use strict'

var statics = require('./statics');

module.exports = function(app, mongoose) {
    var taskSchema = new mongoose.Schema({
        taskNumber: Number,
        executor: String,
        date: {
            type: Date,
            default: Date.now
        },
        description: String,
        minutesSpent: Number,
        taskSource: String
    });

    statics(taskSchema);

    app.db.model('tasks', taskSchema);
}
