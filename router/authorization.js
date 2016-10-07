'use strict'

const path = require('path');
const log = require('../helpers/logger');

exports.index = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
}

exports.auth = (req, res) => {
    const logMsq = 'User (login: ' + req.user.login + ') is authorized and redirected to /';
    log(req, logMsq).info();
    res.redirect('/');
}

exports.logout = (req, res) => {
    let logMsq;
    if (!req.user) {
        logMsq = 'Deleted user is logged out';
    } else {
        logMsq = 'User (login: ' + req.user.login + ') is logged out';
    }
    log(req, logMsq).info();
    req.logout();
    res.redirect('/');
}
