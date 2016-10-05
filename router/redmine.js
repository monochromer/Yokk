'use strict'

const redmineObject = require('node-redmine');
const moment = require('moment');
const assignDefined = require('./helpers/assignDefined');

var hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';
var config = {
    apiKey: process.env.REDMINE_APIKEY || '9422ae1e381047d6abb34dee7dbe4cacc7af7507'
};

var redmine = new redmineObject(hostname, config);


exports.issues = function(req, res) {
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
            task.taskNumber = element.id;

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
            if (!dataToReturn.tasks) dataToReturn.tasks = [];
            dataToReturn.tasks.push(task);
        });

        // dataToReturn.tasks2 = [];
        // dataToReturn.tasks.forEach((element) => {
        //     redmine.get_issue_by_id(element.taskNumber, params, function(err, data) {
        //         let task = {};
        //         task.duration = data.issue.spent_hours;
        //         dataToReturn.tasks2.push(task)
        //
        //         console.log(task);
        //     })
        // })

        redmine.time_entries((err,data)=> {
          var arr = [];
          data.time_entries.forEach((element)=>{

            arr.push(element.hours);

          })
          res.send(dataToReturn);
        });

        var debugInfo = {};
        debugInfo.params = params;
        debugInfo.data = data;
        dataToReturn.debugInfo = debugInfo;

        // res.send(dataToReturn);
    });
}

exports.projects = function(req, res) {
    var params = {};
    redmine.projects(params = {}, function(err, data) {
        if (err) throw err;

        console.log(data);

        console.log('total_count: ' + data.total_count);
        res.send(data);
    });
}

exports.users = function(req, res) {
    var params = {};
    redmine.users(params = {}, function(err, data) {
        if (err) throw err;

        console.log(data);
        res.send(data);
    });
}

exports.currentUser = function(req, res) {
    var params = {};
    redmine.current_user(params = {}, function(err, data) {
        if (err) throw err;

        console.log(data);
        res.send(data);
    });
}
