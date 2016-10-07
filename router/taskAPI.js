'use strict'

const log = require('../helpers/logger');
const moment = require('moment');
const stringToMinutes = require('../helpers/issues').stringToMinutes;
const queryFiller = require('./helpers/queryFiller');

exports.saveTask = (req, res) => {
    console.log(req.body);
    const taskModel = req.app.db.models.tasks;
    const task = new taskModel(req.body);

    if (req.body.dateAdded) {
        task.dateAdded = moment(req.body.dateAdded, 'DD.MM.YYYY').toDate();
    }

    if (req.body.startDate) {
        task.startDate = moment(req.body.startDate, 'DD.MM.YYYY').toDate();
    }
    if (req.body.endDate) {
        task.endDate = moment(req.body.endDate, 'DD.MM.YYYY').toDate();
    }

    task.duration = stringToMinutes(req.body.duration); // getting Minutes

    const statistics = req.app.db.models.statistics;
    const stat = new statistics;
    let lastTaskNumber;

    // initialize lastTaskNumber if not in the statistics collection
    statistics.find({}, (err, stats) => {
        if (stats.length == 0 || typeof stats[0].lastTaskNumber == 'undefined') {
            stat.lastTaskNumber = 0;
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
            const logmsg = 'One of the required fields is not specified';
            res.send({
                message: logmsg
            });
            return log(req, logmsg).err();
        }

        task.taskNumber = lastTaskNumber + 1;

        // TODO Check task.description and send warning if already exists
        task.save((err, task) => {
            if (err) {
                log(req, err).err();
                return res.status(500).send();
            };

            statistics.findOneAndUpdate({}, {
                lastTaskNumber: task.taskNumber
            }, {
                new: true
            }, function(err, data) {
                if (err) {
                    log(req, err).err();
                    return res.status(500).send();
                };
            });

            let logMsq = 'Task (login: ' + task.taskNumber + ') is saved to DB';
            res.status(200).send(task);
            return log(req, logMsq).info();
        });
    });
}

exports.deleteTask = (req, res) => {
    const taskModel = req.app.db.models.tasks;
    const taskId = req.params.taskId;

    taskModel.findByIdAndRemove(taskId, (err, task) => {
        if (err) {
            log(req, err).err();
            var response = {
                message: "Some error uccured while deleting the task",
                taskId: taskId
            };
        } else {
            var response = {
                message: "Task successfully deleted",
                taskId: taskId
            };
            log(req, response.message).info();
        }

        if (task == undefined) {
            var response = {
                message: "Task {taskId: " + taskId + "} could not be found in DB",
                taskId: taskId
            };
            log(req, response.message).info();
        }

        res.send(response);
    });
}

exports.updateTask = (req, res) => {
    const taskModel = req.app.db.models.tasks;
    const taskId = req.params.taskId;
    const update = req.body;

    taskModel.findByIdAndUpdate(taskId, update, {
        new: true
    }, (err, task) => {
        if (err) {
            var logMsq = 'There was some error while updating user data';
            log(req, logMsq).err();
            return res.send('Error. Look server logs.');
        } else {
            console.log(task);
            const message = {
                operationResult: 'Task updated',
                updatedTaskId: taskId,
                update: update
            };
            log(req, message.operationResult).info()
            res.status(200).send(task);
        }
    });
}

exports.projectTasks = (req, res) => {
    const taskModel = req.app.db.models.tasks;
    const query = queryFiller(req.query);
    query.executor = req.user.login;
    // console.log(query); !!!!!!! INVALID DATE

    taskModel.findTasks(query, (err, data) => {
        // var responseData = {};
        // data.forEach((element) => {
        //     let date = moment(element.dateAdded).format('DDMMYYYY');
        //     element.dateAdded = undefined;
        //
        //     if (responseData[date]) {
        //         responseData[date].list.push(element);
        //         responseData[date].totalDuration += element.duration;
        //     } else {
        //         responseData[date] = {};
        //         responseData[date].list = [];
        //         responseData[date].list.push(element);
        //         responseData[date].totalDuration = element.duration;
        //     }
        // });

        // var debugInfo = {};
        // debugInfo.params = req.params;
        // debugInfo.query = query;
        // debugInfo.data = data;
        res.send(data);
    });
}

exports.totalDuration = (req, res) => {
    const taskModel = req.app.db.models.tasks;
    const query = queryFiller(req.query);

    taskModel.getDuration(query, (err, data) => {
        // const debugInfo = {};
        // debugInfo.query = query;
        // debugInfo.data = data;
        let sumMinutes = 0;
        data.forEach((element) => {
            sumMinutes = sumMinutes + element.duration;
        })
        res.status(200).send({
            totalDuration: sumMinutes
        });
    });
}
