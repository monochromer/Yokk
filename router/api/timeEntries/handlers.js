'use strict'

const log = require('../../../helpers/logger');
const moment = require('moment');
const stringToMinutes = require('../../../helpers/issues').stringToMinutes;
const queryFiller = require('../helpers/queryFiller');

exports.timeEntryBatch = function(req, res) {
    // console.log(req.query);
    const query = queryFiller(req.query); //CHECK!
    const TimeEntryModel = req.app.db.models.timeEntry;
    const numberOfDocsToSkip = +req.query.skip || 0;
    const numberOfDocsToReturn = +req.query.limit;
    const maximumDocsToReturn = numberOfDocsToReturn + 20; //20 is possible additional entries that are needed to 'complete' the last returned date

    if (typeof req.query.user !== 'undefined') {
        query.executor = req.query.user;
    } else if (typeof req.user.login !== 'undefined') {
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
}

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
            console.log(timeEntry);
            res.send(logMsg);
            return log(req, logMsg).err();
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
            }, function(err, data) {
                if (err) {
                    log(req, err).err();
                    return res.status(500).send();
                };
            });

            let logMsq = `Time entry (number: ${timeEntry.number}) is saved to DB`;
            log(req, logMsq).info();
            return res.status(200).send(timeEntry);
        });
    });
}

exports.deleteTimeEntry = function(req, res) {
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

        if (timeEntry === undefined) {
            var response = {
                message: "Time entry {timeEntryId: " + timeEntryId + "} could not be found in DB",
                timeEntryId: timeEntryId
            };
            log(req, response.message).info();
        }

        res.send(response);
    });
}

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
            log(req, message.operationResult).info()
            res.status(200).send(timeEntry);
        }
    });
}

exports.totalDuration = function(req, res) {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const query = queryFiller(req.query);

    TimeEntryModel.getDuration(query, (err, data) => {
        let sumMinutes = 0;
        data.forEach((element) => {
            sumMinutes = sumMinutes + element.duration;
        })
        res.status(200).send({
            totalDuration: sumMinutes
        });
    });
}

/******** REDMINE *********/
// const moment = require('moment');
const assignDefined = require('../helpers/assignDefined');

// Original node-redmine module cannot be used because
// redmine.time_entries lacks params configuration
const redmineObject = require('../../../node-redmine-ss');

const hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';

exports.importRedmineIssues = function(req, res) {
    const userModel = req.app.db.models.User;

    userModel.findOne({
        login: req.user.login
    }, {
        redmineApiKey: 1
    }, (err, user) => {
        if (!user.redmineApiKey) {
            console.log('Redmine API key not found for current user');
            res.status(401).send();
            return;
        };

        const redmineConnectionConfig = {
            apiKey: user.redmineApiKey
        };

        const redmine = new redmineObject(hostname, redmineConnectionConfig);

        redmine.current_user({}, (err, userData) => {
            if (err) {
                if (err == 'Server returns : Unauthorized (401)') {
                    res.status(401).send();
                } else {
                    res.status(403).send();
                }
                console.log(err);
                return;
            };

            var getNumberOfEntries = new Promise((resolve, reject) => {
                redmine.time_entries({}, (err, data) => {
                    resolve(data.total_count)
                });
            });

            getNumberOfEntries.then((numOfEntriesToGet) => {
                let allPromisesToGetEntries = [],
                    entries = [];
                let offset = 0;
                do {
                    let timeEntriesParams = {
                        limit: numOfEntriesToGet, //redmine limit for getting entries
                        user_id: userData.user.id,
                        offset: offset,
                    };

                    let promiseToGetEntries = new Promise((resolve, reject) => {
                        redmine.time_entries(timeEntriesParams, (err, data) => {
                            if (err) reject(err);
                            data.time_entries.forEach(element => {
                                let entry = {};
                                entry.redmineTimeEntryId = element.id;
                                entry.number = element.issue.id;
                                entry.executor = req.user.login;
                                entry.date = entry.dateCreated = moment(element.created_on).toDate();
                                if (!element.comments) {
                                    entry.description = 'no comments';
                                } else {
                                    entry.description = element.comments;
                                }
                                entry.duration = (element.hours * 60).toFixed(0);
                                entry.entrySource = 'redmine';
                                entries.push(entry);
                            });
                            resolve(entries);
                        });
                    });
                    allPromisesToGetEntries.push(promiseToGetEntries);

                    offset += 100; //redmine limit for getting entries 100
                    numOfEntriesToGet -= offset;
                }
                while (numOfEntriesToGet > 0);

                Promise.all(allPromisesToGetEntries).then((arraysToConcat) => {
                    let entries = arraysToConcat[0];
                    for (let i = 1; i < arraysToConcat.length; i++) {
                        entries.concat(arraysToConcat[i]);
                    }

                    // saving to DB
                    const TimeEntryModel = req.app.db.models.timeEntry;
                    let entryPromisesArray = [];
                    entries.forEach((entry) => {
                        let promiseIssueUpsert = new Promise((resolve, reject) => {
                            TimeEntryModel.findOneAndUpdate({
                                redmineTimeEntryId: entry.redmineTimeEntryId
                            }, entry, {
                                new: true,
                                upsert: true,
                            }, (err, doc) => {
                                if (err) {
                                    console.log('Error while saving an entry:' + err);
                                    resolve(err);
                                } else {
                                    resolve(doc);
                                }
                            });
                        });
                        entryPromisesArray.push(promiseIssueUpsert);
                    });
                    Promise.all(entryPromisesArray).then((documents) => {
                        console.log('Tasks are syncronized');
                        res.status(200).send(documents);
                    })
                });
            });
        });
    });
}
