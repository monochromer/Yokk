'use strict'

const redmineObject = require('../node-redmine-ss');
const moment = require('moment');
const assignDefined = require('./helpers/assignDefined');

var hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';


exports.importRedmineIssues = function(req, res) {
    const userModel = req.app.db.models.User;
    const redmineConnectionConfig = {};
    userModel.findOne({
        login: req.query.login
    }, {
        redmineApiKey: 1
    }, (err, user) => {
        if (!user.redmineApiKey) {
            console.log('Redmine API key not found for current user');
            return
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
                do {
                    let timeEntriesParams = {
                        limit: numOfEntriesToGet, //redmine limit for getting entries
                        user_id: userData.user.id,
                        offset: 0
                    };

                    let promiseToGetEntries = new Promise((resolve, reject) => {
                        redmine.time_entries(timeEntriesParams, (err, data) => {
                            if (err) reject(err);
                            data.time_entries.forEach(element => {
                                let entry = {};
                                entry.taskNumber = element.issue.id;
                                entry.executor = timeEntriesParams.user_id;
                                entry.dateAdded = entry.dateCreated = moment(element.created_on).toDate();
                                entry.description = element.comments;
                                entry.duration = (element.hours * 60).toFixed(0);
                                entry.taskSource = 'redmine';
                                entries.push(entry);
                            });
                            resolve(entries);
                        });
                    });
                    // promiseToGetEntries.then((val)=>{console.log(val);});
                    p.push(promiseToGetEntries);

                    timeEntriesParams.offset += 100; //redmine limit for getting entries 100
                    numOfEntriesToGet -= timeEntriesParams.offset;
                }
                while (numOfEntriesToGet > 0);

                Promise.all(p).then((arraysToConcat) => {
                    let entries = arraysToConcat[0];
                    for (let i = 1; i < arraysToConcat.length; i++) {
                        entries.concat(arraysToConcat[i]);
                    }

                    // saving to DB
                    const taskModel = req.app.db.models.tasks;
                    const entryPromisesArray = [];
                    entries.forEach((entry) => {
                        let promiseIssueUpsert = new Promise((resolve, reject) => {
                            taskModel.findOneAndUpdate({
                                taskNumber: entry.taskNumber
                            }, entry, {
                                new: true,
                                upsert: true
                            }, (err, doc) => {
                                if (err) {
                                    console.log('Error while saving an entry!');
                                    console.log(err);
                                    errors.push(err);
                                    resolve(err);
                                } else {
                                    console.log('Entry saved/updated successfully');
                                    resolve(doc);
                                }
                            });
                        });
                        entryPromisesArray.push(promiseIssueUpsert);
                    });
                    Promise.all(entryPromisesArray).then(documents => {
                        res.status(200).send(documents);
                    })


                });
            });




            // params:
            // limit: Num (number of issues per page)
            // offset: Num (skip this number of issues in response)
            // sort: ColumntName (or sort:desc)
            // FILTERS: project_id, subproject_id, tracker_id, status_id, assigned_to_id ...
            // created_on: date (TODO: how to give a period?)

            //         redmine.issues(params, function(err, data) {
            //             var issuePromisesArray = [];
            //             if (err) throw err;
            //
            //             data.issues.forEach((element) => {
            //                 let promiseIssue = new Promise((resolve, reject) => {
            //                     redmine.get_issue_by_id(element.id, params, (err, data) => {
            //                         let task = {};
            //                         task.taskNumber = element.id;
            //
            //                         // executor probably should be from request
            //                         if (typeof data.issue.assigned_to === 'undefined') {
            //                             task.executor = 'not assigned';
            //                         } else {
            //                             task.executor = data.issue.assigned_to.name;
            //                         };
            //                         task.dateAdded = moment(data.issue.created_on, 'YYYY-MM-DD').toDate();
            //
            //                         if (typeof data.issue.start_date === 'undefined') {
            //                             task.startDate = moment().toDate()
            //                         } else {
            //                             task.startDate = moment(data.issue.start_date, 'YYYY-MM-DD').toDate();
            //                         };
            //
            //                         if (typeof data.issue.due_date === 'undefined') {
            //                             task.endDate = moment().toDate()
            //                         } else {
            //                             task.endDate = moment(data.issue.due_date, 'YYYY-MM-DD').toDate();
            //                         };
            //
            //                         task.description = data.issue.subject;
            //                         task.duration = (data.issue.spent_hours * 60).toFixed(0);
            //                         task.taskSource = 'redmine';
            //                         resolve(task);
            //                     });
            //                 });
            //                 issuePromisesArray.push(promiseIssue);
            //             });
            //             Promise.all(issuePromisesArray).then(tasks => {
            //                 var updateIssuePromisesArray = [];
            //                 let errors = [];
            //                 tasks.forEach(task => {
            //                     let promiseIssueUpdate = new Promise((resolve, reject) => {
            //                         taskModel.findOneAndUpdate({
            //                             taskNumber: task.taskNumber
            //                         }, task, {
            //                             new: true,
            //                             upsert: true
            //                         }, (err, doc) => {
            //                             if (err) {
            //                                 console.log('Error while saving a task!');
            //                                 console.log(err);
            //                                 errors.push(err);
            //                                 resolve(err);
            //                             } else {
            //                                 console.log('Task saved/updated successfully');
            //                                 resolve(doc);
            //                             }
            //                         })
            //                     });
            //                     updateIssuePromisesArray.push(promiseIssueUpdate);
            //                 });
            //                 Promise.all(updateIssuePromisesArray).then(issues => {
            //                     res.send(issues);
            //                 });
            //                 // if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            //                 //     res.send({
            //                 //         errors: errors
            //                 //     });
            //                 // } else {
            //                 //     res.send(tasks);
            //                 // }
            //
            //             });
            //         });
        });
    });
}
