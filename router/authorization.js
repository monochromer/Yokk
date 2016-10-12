'use strict'

const path = require('path');
const log = require('../helpers/logger');

exports.index = function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.login = function(req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
}

exports.auth = function(req, res) {
    const logMsq = `User (login: ${req.user.login}) is authorized and redirected to /`;
    log(req, logMsq).info();
    res.redirect('/');
}

exports.logout = function(req, res) {
    if (!req.user) {
        let logMsq = 'Deleted user is logged out';
    } else {
        let logMsq = 'User (login: ' + req.user.login + ') is logged out';
    }
    log(req, logMsq).info();
    req.logout();
    res.redirect('/');
}
