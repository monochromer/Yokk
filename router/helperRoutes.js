'use strict'

var log = require('../helpers/logger');

exports.redirectUndefinedRoutes = function(req, res) {
    var logMsq = 'Not found';
    log(req, logMsq).info();
    res.redirect('/');
}
