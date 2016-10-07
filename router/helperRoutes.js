'use strict'

var log = require('../helpers/logger');

exports.redirectUndefinedRoutes = (req, res) => {
    const logMsq = `${req.url} is not found within server paths`;
    log(req, logMsq).info();
    res.redirect('/');
}
