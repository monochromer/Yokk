'use strict';

module.exports = function(schema) {

    schema.statics.allTasks = function(cb) {
        var fieldsToReturn = {
            _id: 1,
            taskNumber: 1,
            executor: 1,
            date: 1,
            description: 1,
            minutesSpent: 1,
            taskSource: 1
        }
        return this.find({}, fieldsToReturn, cb);
    };

    schema.statics.findTasks = function(query, cb) {
        var fieldsToReturn = {
            _id: 1,
            taskNumber: 1,
            description: 1,
            duration: 1,
            dateAdded: 1,
            executor: 1,
            taskSource: 1
        }
        return this.find(query, fieldsToReturn, cb);
    };

    schema.statics.findTaskByNumber = function(taskNumber, cb) {
        var fieldsToReturn = {
            _id: 1,
            taskNumber: 1,
            executor: 1,
            date: 1,
            description: 1,
            minutesSpent: 1,
            taskSource: 1
        }
        return this.findOne({
            taskNumber: taskNumber
        }, fieldsToReturn, cb);
    };

    schema.statics.editTask = function(id, updateObject, cb) {
        return this.findOneAndUpdate({
            _id: id
        }, updateObject, {
            new: true
        }, cb);
    };

    schema.statics.deleteTask = function(id, cb) {
        return this.remove({
            _id: id
        }, cb);
    };

}
