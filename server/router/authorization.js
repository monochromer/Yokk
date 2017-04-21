'use strict'

const path = require('path');
const log = require('../helpers/logger');

exports.index = function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.login = function(req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
};

exports.auth = function(req, res) {
    //const logMsq = `User (login: ${req.user.login}) is authorized and redirected to /`;
    res.sendStatus(200);
};

exports.logout = function(req, res) {
    let logMsq = 'Deleted user is logged out';
    if (req.user) {
        logMsq = `User (login: ${req.user.login}) is logged out`;
    }
    log(req, logMsq).info();
    req.logout();
    res.redirect('/');
};
