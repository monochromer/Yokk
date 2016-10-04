'use strict'
const moment = require('moment');

module.exports = (query) => {

    let queryToReturn = {};
    if (query.from || query.to) {
        if (query.from == query.to) {
            queryToReturn.dateAdded = query.from;
        } else {
            queryToReturn.dateAdded = {};
            switch (query.from) {

                case undefined:
                    queryToReturn.dateAdded["$gte"] = moment().toDate();
                    break;
                default:
                    queryToReturn.dateAdded["$gte"] = moment(query.from, 'DDMMYYYY').toDate()
            }

            switch (query.to) {
                case undefined:
                    queryToReturn.dateAdded["$lte"] = moment().toDate();
                    break;
                default:
                    queryToReturn.dateAdded["$lte"] = moment(query.to, 'DDMMYYYY').toDate()
            }
        }
    } else {
        queryToReturn.dateAdded = moment().toDate()
    }

    if (query.user) queryToReturn.executor = query.user;
    if (query.source) queryToReturn.source = query.source;

    return queryToReturn;
}
