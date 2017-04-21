const moment = require('moment');

exports.toDate = function(date, type) {
    if(!type) {
        return moment(date, 'DD.MM.YYYY').toDate();
    } else {
        return moment(date, 'DD.MM.YYYY').add(1, 'day').toDate()
    }
};


