'use strict'

const log = require('../helpers/logger');
const path = require('path');

exports.redirectUndefinedRoutes = function(req, res) {
    const logMsq = `${req.url} is not found within server paths`;
    log(req, logMsq).info();
    res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
}
