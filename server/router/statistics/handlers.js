'use strict'

const log = require('../../helpers/logger');
const moment = require('moment');
const queryFiller = require('../helpers/queryFiller');

exports.getStatistics = function(req, res) {
    const query = queryFiller(req.query);
    const TimeEntryModel = req.app.db.models.timeEntry;
    const UserModel = req.app.db.models.User;

    let rawData = {};

    const statisticsPromises = [
        new Promise((resolve, reject) => {
            TimeEntryModel.find(query).exec((err, data) => {
                rawData.timeEntries = data;
                resolve();
            });
        }),
        new Promise((resolve, reject) => {
            UserModel.find(query).exec((err, data) => {
                rawData.users = data;
                resolve();
            });
        })
    ];

    Promise.all(statisticsPromises).then((val) => {
        console.log(val);
        let statistics = {};
        statistics.numberOfUsers = rawData.users.length;
        statistics.totalNumberOfTimeentries = rawData.timeEntries.length;
        statistics.numberOfTimeEntriesByUsers = rawData.timeEntries.length;
        res.send(statistics);
    })

}
