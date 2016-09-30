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
    console.log(req.body);
    var logMsq = 'User (login: ' + req.user.login + ') is authorized and redirected to /';
    log(req, logMsq).info();
    res.redirect('/');
}

exports.logout = function(req, res) {
    var logMsq = 'User (login: ' + req.user.login + ') is logged out';
    log(req, logMsq).info();
    req.logout();
    res.redirect('/');
}
