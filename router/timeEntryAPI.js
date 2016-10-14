'use strict';

const log = require('../helpers/logger');
const moment = require('moment');
const stringToMinutes = require('../helpers/issues').stringToMinutes;
const queryFiller = require('./helpers/queryFiller');

exports.timeEntryBatch = function(req, res) {
    const query = queryFiller(req.query); //CHECK!
    const TimeEntryModel = req.app.db.models.timeEntry;
    const numberOfDocsToSkip = +req.query.skip || 0;
    const numberOfDocsToReturn = +req.query.limit;
    const maximumDocsToReturn = numberOfDocsToReturn + 20; //20 is possible additional entries that are needed to 'complete' the last returned date

    if (typeof req.user !== 'undefined') {
        query.executor = req.user.login;
    }

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
                if (timeEntries.length <= numberOfDocsToReturn) {
                    return res.send(timeEntries);
                }
                if (!moment(timeEntries[i].dateCreated).isSame(moment(timeEntries[i + 1].dateCreated), 'day')) {
                    return res.send(timeEntries.slice(0, i + 1));
                }
            }
            res.send(timeEntries);
        });
};

exports.saveTimeEntry = function(req, res) {
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

    timeEntry.duration = stringToMinutes(req.body.duration); //duration in minutes

    const statistics = req.app.db.models.statistics;
    const stat = new statistics;
    let lastTimeEntryNumber = 0;

    // initialize lastTimeEntryNumber if not in the statistics collection
    statistics.find({}, (err, stats) => {
        if (stats.length == 0 || typeof stats[0].lastTimeEntryNumber == 'undefined') {
            stat.lastTimeEntryNumber = 0;
            stat.save();
        } else {
            lastTimeEntryNumber = stats[0].lastTimeEntryNumber;
        }

        // req.body should contain required field:
        // - executor
        // - description
        // - entrySource
        if (!timeEntry.executor || !timeEntry.description || !timeEntry.entrySource) {
            // TODO If some of the fiels not specified
            // Return the name of not specified field
            const logMsg = 'One of the required fields is not specified';
            res.send(logMsg);
            return log(req, logmsg).err();
        }

        timeEntry.lastTimeEntryNumber = lastTimeEntryNumber + 1;

        // TODO Check lastTimeEntryNumber.description and send warning if already exists
        timeEntry.save((err, timeEntry) => {
            if (err) {
                log(req, err).err();
                return res.status(500).send();
            }

            statistics.findOneAndUpdate({}, {
                lastTimeEntryNumber: timeEntry.number
            }, {
                new: true
            }, function(err) {
                if (err) {
                    log(req, err).err();
                    return res.status(500).send();
                }
            });

            let logMsq = `Time entry (number: ${timeEntry.number}) is saved to DB`;
            log(req, logMsq).info();
            return res.status(200).send(timeEntry);
        });
    });
};

exports.deleteTimeEntry = function(req, res) {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const timeEntryId = req.params.timeEntryId;

    TimeEntryModel.findByIdAndRemove(timeEntryId, (err, timeEntry) => {
        var response = {};
        if (err) {
            log(req, err).err();
            response = {
                message: "Some error uccured while deleting the time entry",
                timeEntryId: timeEntryId
            };
        } else {
            response = {
                message: "Time entry successfully deleted",
                timeEntryId: timeEntryId
            };
            log(req, response.message).info();
        }

        if (timeEntry === undefined) {
            response = {
                message: "Time entry {timeEntryId: " + timeEntryId + "} could not be found in DB",
                timeEntryId: timeEntryId
            };
            log(req, response.message).info();
        }

        res.send(response);
    });
};

exports.updateTimeEntry = function(req, res) {
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
            const message = {
                operationResult: 'Time entry updated',
                updatedTimeEntryId: timeEntryId,
                update: update
            };
            log(req, message.operationResult).info();
            res.status(200).send(timeEntry);
        }
    });
};

exports.totalDuration = function(req, res) {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const query = queryFiller(req.query);

    TimeEntryModel.getDuration(query, (err, data) => {
        let sumMinutes = 0;
        data.forEach((element) => {
            sumMinutes = sumMinutes + element.duration;
        });
        res.status(200).send({
            totalDuration: sumMinutes
        });
    });
};
