'use strict'

const log = require('../helpers/logger');
const moment = require('moment');
const stringToMinutes = require('../helpers/issues').stringToMinutes;
const queryFiller = require('./helpers/queryFiller');

exports.timeEntryBatch = (req, res) => {
    const query = queryFiller(req.query); //CHECK?
    const TimeEntryModel = req.app.db.models.timeEntry;
    const numberOfDocsToSkip = +req.query.skip || 0;
    const numberOfDocsToReturn = +req.query.limit;
    const maximumDocsToReturn = numberOfDocsToReturn + 20;

    if (typeof req.user !== 'undefined') {
        query.executor = req.user.login;
    };

    TimeEntryModel
        .find(query)
        .sort({
            dateCreated: -1
        })
        // .select({ _id: 0, dateCreated: 1 })
        .skip(numberOfDocsToSkip)
        // .limit(10)
        .exec((err, timeEntries) => {
            if (err) {
                console.log(err);
            }
            for (let i = numberOfDocsToReturn - 1; i < maximumDocsToReturn - 1; i++) {

                if (!moment(timeEntries[i].dateCreated).isSame(moment(timeEntries[i + 1].dateCreated), 'day')) {
                    return res.send(timeEntries.slice(0, i + 1));
                }
            }
            res.send(timeEntries);
        });
}

exports.saveTimeEntry = (req, res) => {
    console.log(req.body);
    const TimeEntryModel = req.app.db.models.timeEntry;
    const task = new TimeEntryModel(req.body);

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
        // - entrySource
        if (!task.executor || !task.description || !task.entrySource) {
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

exports.deleteTimeEntry = (req, res) => {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const taskId = req.params.taskId;

    TimeEntryModel.findByIdAndRemove(taskId, (err, task) => {
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

exports.updateTimeEntry = (req, res) => {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const taskId = req.params.taskId;
    const update = req.body;

    TimeEntryModel.findByIdAndUpdate(taskId, update, {
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

exports.totalDuration = (req, res) => {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const query = queryFiller(req.query);

    TimeEntryModel.getDuration(query, (err, data) => {
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
