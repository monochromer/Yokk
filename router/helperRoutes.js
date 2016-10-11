'use strict'

var log = require('../helpers/logger');

exports.redirectUndefinedRoutes = (req, res) => {
    console.log(req);
    const logMsq = `${req.url} is not found within server paths`;
    log(req, logMsq).info();
    res.redirect('/');
}
