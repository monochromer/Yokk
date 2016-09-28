'use strict'

// in order to get logs in server console process.env.NODE_ENV = development

var moment = require('moment');
var fs = require('fs');
var Log = require('log');
var dir = './logs';

if ( !fs.existsSync(dir) ) {
    fs.mkdirSync(dir);
}

var log = new Log('debug', fs.createWriteStream(dir +'/start_' + moment().format() + '.log') );

module.exports = function(request, message) {
  var logger = {
    err: function() {
      if (process.env.NODE_ENV == 'development')
      console.log(moment().format() + ' ' + request.method + ' ' +
                  request.route.path + ' Error: ' + message);
      log.error(request.method + ' ' + message);
      },
    info: function(){
    if (process.env.NODE_ENV == 'development')
      console.log(moment().format() + ' ' + request.method + ' ' +
                  request.route.path + ' Info: ' + message);
    log.info(request.method + ' ' + message);
    }
  };
  return logger;
};
