'use strict'

const redmineObject = require('../node-redmine-ss');
const moment = require('moment');
const assignDefined = require('./helpers/assignDefined');

var hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';


exports.importRedmineIssues = (req, res) => {
    const userModel = req.app.db.models.User;
    const redmineConnectionConfig = {};
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
        const params = {};
        params.limit = req.query.limit;

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
            params.assigned_to_id = userData.user.id;

            var getNumberOfEntries = new Promise((resolve, reject) => {
                redmine.time_entries({}, (err, data) => {
                    resolve(data.total_count)
                });
            });

            getNumberOfEntries.then((numOfEntriesToGet) => {

                const p = [];
                const entries = [];
                let offset = 0;
                do {
                    var timeEntriesParams = {
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
                    p.push(promiseToGetEntries);

                    offset += 100; //redmine limit for getting entries 100
                    numOfEntriesToGet -= offset;
                }
                while (numOfEntriesToGet > 0);

                Promise.all(p).then((arraysToConcat) => {
                    let entries = arraysToConcat[0];
                    for (let i = 1; i < arraysToConcat.length; i++) {
                        entries.concat(arraysToConcat[i]);
                    }

                    // saving to DB
                    const TimeEntryModel = req.app.db.models.timeEntry;
                    const entryPromisesArray = [];
                    entries.forEach((entry) => {
                        let promiseIssueUpsert = new Promise((resolve, reject) => {
                            TimeEntryModel.findOneAndUpdate({
                                redmineTimeEntryId: entry.redmineTimeEntryId
                            }, entry, {
                                new: true,
                                upsert: true,
                            }, (err, doc) => {
                                if (err) {
                                    console.log('Error while saving an entry:');
                                    console.log(err);
                                    errors.push(err);
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
