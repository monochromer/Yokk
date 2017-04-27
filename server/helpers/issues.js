'use strict'

const moment = require('moment');

exports.stringToMinutes = function(duration) {
  const minutes = moment.duration(duration).asMinutes();
  return minutes;
}
