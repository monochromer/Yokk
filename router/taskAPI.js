'use strict'

const log = require('../helpers/logger');

exports.updateTask = function(req, res) {
    const taskModel = req.app.db.models.tasks;
    const taskNumber = req.params.taskNumber;

    var update = req.body;

    taskModel.findOneAndUpdate({
        taskNumber: taskNumber
    }, update, function(err, task) {
        if (err) {
            var logMsq = 'There was some error while updating user data';
            log(req, logMsq).err();
            return res.send('Error. Look server logs.');
        } else {
            console.log(task);
            const message = {
                operationResult: 'Task updated',
                updatedTaskNumber: taskNumber,
                update: update
            };
            log(req, message.operationResult).info()
            res.status(200).send(message);
        }
    });
}

exports.saveTask = function(req, res) {
    const taskModel = req.app.db.models.tasks;
    var task = new taskModel(req.body);
    const statistics = req.app.db.models.statistics;
    var stat = new statistics;
    var lastTaskNumber;

    // initialize lastTaskNumber if not in the statistics collection
    statistics.find({}, function(err, stats) {
        if (stats.length == 0 || typeof stats[0].lastTaskNumber == 'undefined') {
            stat.lastTaskNumber = 0;
            console.log(stat.lastTaskNumber);
            stat.save();
            lastTaskNumber = 0;
        } else {
            lastTaskNumber = stats[0].lastTaskNumber;
        }

        // req.body should contain required field:
        // - executor
        // - description
        // - taskSource
        if (!task.executor || !task.description || !task.taskSource) {
            // TODO Return not specified field
            var logmsg = 'One of the required fields is not specified';

            res.send({
                message: logmsg
            });
            return log(req, logmsg).err();
        }

        task.taskNumber = lastTaskNumber + 1;

        // TODO Check task.description and send warning if already exists

        task.save(function(err, task) {
            if (err) {
                log(req, err).err();
                return res.send({
                    message: 'Some error occured while saving task (login: ' +
                        task.taskNumber + ') in DB. Look server logs.'
                });
            };

            statistics.findOneAndUpdate({}, {
                lastTaskNumber: task.taskNumber
            }, {
                new: true
            }, function(err, data) {
                console.log(data);
            });

            var logMsq = 'Task (login: ' + task.taskNumber + ') is saved to DB';
            res.status(200).send(task);
            return log(req, logMsq).info();
        });

    });

}

exports.deleteTask = function(req, res) {
    const taskModel = req.app.db.models.tasks;
    const taskNumber = req.params.taskNumber;

    taskModel.findOneAndRemove({
        taskNumber: taskNumber
    }, function(err, task) {

        if (err) {
            var response = {
                message: "Some error uccured while deleting the task",
                taskNumber: taskNumber
            };
        } else {
            var response = {
                message: "Task successfully deleted",
                taskNumber: taskNumber
            };
        }

        if (task == undefined) {
            var response = {
                message: "Task {taskNumber: " + taskNumber + "} could not be found in DB",
                taskNumber: taskNumber
            };
        }

        res.send(response);
    });

}
