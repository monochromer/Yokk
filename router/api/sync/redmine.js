const assignDefined = require('../helpers/assignDefined');
const redmineObject = require('../../../node-redmine-ss');
const hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';
const moment = require('moment');

module.exports = function(req, res, next) {
    const userModel = req.app.db.models.User;
    var login = req.user ? req.user.login : req.query.login;
    userModel.findOne({
        login: login
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
                                entry.executor = login;
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
                                    resolve(err);
                                } else {
                                    resolve(doc);
                                }
                            });
                        });
                        entryPromisesArray.push(promiseIssueUpsert);
                    });
                    Promise.all(entryPromisesArray).then((documents) => {
                        res.status(200).send(documents);
                    })
                });
            });
        });
    });
};
