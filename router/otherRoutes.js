'use strict'

var log = require('../helpers/logger');

exports = module.exports = function(app, passport) {

    app.get('/api/check_permissions', function(req, res) {
        // as of now, returned fields can be adjusted in userpassport.js
        res.send(req.user);
    });


    app.get('*', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
        var logMsq = 'Not found';
        log(req, logMsq).info();
        res.redirect('/');
    });

}
