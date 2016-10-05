'use strict'

const redmineObject = require('node-redmine');
const moment = require('moment');
const assignDefined = require('./helpers/assignDefined');

var hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';
var config = {
    apiKey: process.env.REDMINE_APIKEY || '9422ae1e381047d6abb34dee7dbe4cacc7af7507'
};

var redmine = new redmineObject(hostname, config);


exports.importRedmineIssues = function(req, res) {
    const params = req.query;
    const id = parseInt(params.id);
    var dataToReturn = {};

    // params:
    // limit: Num (number of issues per page)
    // offset: Num (skip this number of issues in response)
    // sort: ColumntName (or sort:desc)
    // FILTERS: project_id, subproject_id, tracker_id, status_id, assigned_to_id ...
    // created_on: date (TODO: how to give a period?)

    redmine.issues(params, function(err, data) {
        if (err) throw err;

        data.issues.forEach((element) => {
            let task = {};

            if (typeof element.assigned_to === 'undefined') {
                task.exectutor = 'not assigned';
            } else {
                task.exectutor = element.assigned_to.name;
            };

            task.dateAdded = moment(element.created_on, 'YYYY-MM-DD').toDate();

            if (typeof element.start_date === 'undefined') {
                task.startDate = 'not assigned';
            } else {
                task.startDate = moment(element.start_date, 'YYYY-MM-DD').toDate();
            };

            if (typeof element.due_date === 'undefined') {
                task.endDate = 'not assigned';
            } else {
                task.endDate = moment(element.due_date, 'YYYY-MM-DD').toDate();
            };

            task.description = element.subject;
            task.taskSource = "redmine";
            if (!dataToReturn.tasks) dataToReturn.tasks = {};
            dataToReturn.tasks[element.id] = task;
        });

        // var debugInfo = {};
        // debugInfo.params = params;
        // debugInfo.data = data;
        // dataToReturn.debugInfo = debugInfo;

        redmine.time_entries((err, data) => {
            var arr = [];
            data.time_entries.forEach((element) => {
                console.log(element);
                if (!dataToReturn.tasks[element.issue.id]) {
                    dataToReturn.errMsg = {
                        msg: 'Therewas an error. Some time_entries dont match tasks. Check limit, probably it default (to low)'
                    }
                    if (!dataToReturn.errMsg.issuesIdsArray) dataToReturn.errMsg.issuesIdsArray = [];
                    dataToReturn.errMsg.issuesIdsArray.push(element.issue.id);
                } else {
                    if (!dataToReturn.tasks[element.issue.id].duration) {
                        dataToReturn.tasks[element.issue.id].duration = element.hours;
                    } else {
                        dataToReturn.tasks[element.issue.id].duration += element.hours;
                    }

                }
            });
            res.send(dataToReturn);
        });

    });
}
