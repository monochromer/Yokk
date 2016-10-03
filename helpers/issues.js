var moment = require('moment');

exports.stringToMinutes = function(duration) {
    var minutes = moment.duration(duration).asMinutes();
    return minutes;
}
