'use strict'

const moment = require('moment');

module.exports = function(query) {
    let queryToReturn = {};
    if (query.from || query.to) {
        if (query.from === query.to) {
            queryToReturn.date = moment(query.from, 'DD.MM.YYYY').toDate();
        } else {
            queryToReturn.date = {};
            switch (query.from) {

                case undefined:
                    queryToReturn.date["$gte"] = moment().toDate();
                    break;
                default:
                    queryToReturn.date["$gte"] = moment(query.from, 'DD.MM.YYYY').toDate()
            }

            switch (query.to) {
                case undefined:
                    queryToReturn.date["$lte"] = moment().toDate();
                    break;
                default:
                    queryToReturn.date["$lte"] = moment(query.to, 'DD.MM.YYYY').toDate()
            }
        }
    }


    if (typeof query.user !== undefined) { queryToReturn.executor = query.user };
    if (query.source) queryToReturn.source = query.source;
    if (query.batch !== undefined) {
        queryToReturn.batch = query.batch;
    }

    return queryToReturn;
}
