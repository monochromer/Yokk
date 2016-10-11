'use strict'

var log = require('../helpers/logger');
var path = require('path');

exports.redirectUndefinedRoutes = (req, res) => {
    console.log(req);
    const logMsq = `${req.url} is not found within server paths`;
    log(req, logMsq).info();
    res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
}
