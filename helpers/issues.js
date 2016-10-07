'use strict'

const moment = require('moment');

exports.stringToMinutes = (duration) => {
    const minutes = moment.duration(duration).asMinutes();
    return minutes;
}
