'use strict'

const moment = require('moment');

module.exports = function(query) {

    let queryToReturn = {};
    if (query.from || query.to) {
        if (query.from == query.to) {
            queryToReturn.date = query.from;
        } else {
            queryToReturn.date = {};
            switch (query.from) {

                case undefined:
                    queryToReturn.date["$gte"] = moment().toDate();
                    break;
                default:
                    queryToReturn.date["$gte"] = moment(query.from, 'DDMMYYYY').toDate()
            }

            switch (query.to) {
                case undefined:
                    queryToReturn.date["$lte"] = moment().toDate();
                    break;
                default:
                    queryToReturn.date["$lte"] = moment(query.to, 'DDMMYYYY').toDate()
            }
        }
    }

    if (query.user) queryToReturn.executor = query.user;
    if (query.source) queryToReturn.source = query.source;

    if (query.batch !== undefined) {
        queryToReturn.batch = query.batch;
    }

    return queryToReturn;
}
