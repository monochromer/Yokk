'use strict'

// in order to get logs in server console process.env.NODE_ENV = development

const moment = require('moment');
const fs = require('fs');
const Log = require('log');
const dir = './logs';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const log = new Log('debug', fs.createWriteStream(dir + '/start_' + moment().format() + '.log'));

module.exports = (request, message) => {
    const logger = {
        err: function() {
            if (process.env.NODE_ENV == 'development') {
                console.log(moment().format() + ' ' + request.method + ' ' + request.route.path + ' Error: ' + message);
            }

            log.error(request.method + ' ' + message);
        },
        info: function() {
            if (process.env.NODE_ENV == 'development') {
                console.log(moment().format() + ' ' + request.method + ' ' + request.route.path + ' Info: ' + message);
            }
            log.info(request.method + ' ' + message);
        }
    };
    return logger;
};
