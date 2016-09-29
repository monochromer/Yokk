'use strict'

var log = require('../helpers/logger');

exports.checkUserPermissions = function(req, res) {
    // as of now, returned fields can be adjusted in userpassport.js
    res.send(req.user);
}

exports.redirectUndefinedRoutes = function(req, res) {
    var logMsq = 'Not found';
    log(req, logMsq).info();
    res.redirect('/');
}
