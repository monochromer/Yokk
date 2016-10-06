'use strict'

var log = require('../helpers/logger');

exports.redirectUndefinedRoutes = function(req, res) {
    var logMsq = req.url + ' is not found within server paths';
    log(req, logMsq).info();
    res.redirect('/');
}
