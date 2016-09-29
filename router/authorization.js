'use strict'

const path = require('path');
const log = require('../helpers/logger');

module.exports = function(app, passport) {

    app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    });

    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), function(req, res) {
        var logMsq = 'User (login: ' + req.user.login + ') is authorized and redirected to /';
        log(req, logMsq).info();
        res.redirect('/');
    });

    app.get('/logout', function(req, res) {
        var logMsq = 'User (login: ' + req.user.login + ') is logged out';
        log(req, logMsq).info();
        req.logout();
        res.redirect('/');
    });

}
