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
                if (timeEntries.length <= numberOfDocsToReturn) { return res.send(timeEntries); }
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
    const timeEntry = new TimeEntryModel(req.body);

    if (req.body.date) {
        timeEntry.date = moment(req.body.date, 'DD.MM.YYYY').toDate();
    }

    if (req.body.startDate) {
        timeEntry.startDate = moment(req.body.startDate, 'DD.MM.YYYY').toDate();
    }
    if (req.body.endDate) {
        timeEntry.endDate = moment(req.body.endDate, 'DD.MM.YYYY').toDate();
    }

    timeEntry.duration = stringToMinutes(req.body.duration); // getting Minutes

    const statistics = req.app.db.models.statistics;
    const stat = new statistics;
    let lastTimeEntryNumber;

    // initialize lastTimeEntryNumber if not in the statistics collection
    statistics.find({}, (err, stats) => {
        if (stats.length == 0 || typeof stats[0].lastTimeEntryNumber == 'undefined') {
            stat.lastTimeEntryNumber = 0;
            stat.save();
            lastTimeEntryNumber = 0;
        } else {
            lastTimeEntryNumber = stats[0].lastTimeEntryNumber;
        }

        // req.body should contain required field:
        // - executor
        // - description
        // - entrySource
        if (!timeEntry.executor || !timeEntry.description || !timeEntry.entrySource) {
            // TODO Return not specified field
            const logmsg = 'One of the required fields is not specified';
            res.send({
                message: logmsg
            });
            return log(req, logmsg).err();
        }

        timeEntry.lastTimeEntryNumber = lastTimeEntryNumber + 1;

        // TODO Check lastTimeEntryNumber.description and send warning if already exists
        timeEntry.save((err, timeEntry) => {
            if (err) {
                log(req, err).err();
                return res.status(500).send();
            };

            statistics.findOneAndUpdate({}, {
                lastTimeEntryNumber: timeEntry.number
            }, {
                new: true
            }, function(err, data) {
                if (err) {
                    log(req, err).err();
                    return res.status(500).send();
                };
            });

            let logMsq = 'Time entry (login: ' + timeEntry.number + ') is saved to DB';
            res.status(200).send(timeEntry);
            return log(req, logMsq).info();
        });
    });
}

exports.deleteTimeEntry = (req, res) => {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const timeEntryId = req.params.timeEntryId;

    TimeEntryModel.findByIdAndRemove(timeEntryId, (err, timeEntry) => {
        if (err) {
            log(req, err).err();
            var response = {
                message: "Some error uccured while deleting the time entry",
                timeEntryId: timeEntryId
            };
        } else {
            var response = {
                message: "Time entry successfully deleted",
                timeEntryId: timeEntryId
            };
            log(req, response.message).info();
        }

        if (timeEntry == undefined) {
            var response = {
                message: "Time entry {timeEntryId: " + timeEntryId + "} could not be found in DB",
                timeEntryId: timeEntryId
            };
            log(req, response.message).info();
        }

        res.send(response);
    });
}

exports.updateTimeEntry = (req, res) => {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const timeEntryId = req.params.timeEntryId;
    const update = req.body;
    TimeEntryModel.findByIdAndUpdate(timeEntryId, update, {
        new: true
    }, (err, timeEntry) => {
        if (err) {
            var logMsq = 'There was some error while updating user data';
            log(req, logMsq).err();
            return res.send('Error. Look server logs.');
        } else {
            console.log(timeEntry);
            const message = {
                operationResult: 'Time entry updated',
                updatedTimeEntryId: timeEntryId,
                update: update
            };
            log(req, message.operationResult).info()
            res.status(200).send(timeEntry);
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