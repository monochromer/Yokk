'use strict'

const redmineObject = require('node-redmine');

var hostname = process.env.REDMINE_HOST || 'redmine.soshace.com';
var config = {
    apiKey: process.env.REDMINE_APIKEY || '9422ae1e381047d6abb34dee7dbe4cacc7af7507'
};

var redmine = new redmineObject(hostname, config);

exports.issues = function(req, res) {

    redmine.issues({
        limit: 10
    }, function(err, data) {
        if (err) throw err;

        for (var i in data.issues) {
            console.log(data.issues[i]);
        }

        console.log('total_count: ' + data.total_count);
        res.send(res.send('foo'));
    });
}

exports.issues = function(req, res) {
    var params = {};
    redmine.issues(params = {}, function(err, data) {
        if (err) throw err;

        for (var i in data.issues) {
            console.log(data.issues[i]);
        }

        console.log('total_count: ' + data.total_count);
        res.send(data);
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
