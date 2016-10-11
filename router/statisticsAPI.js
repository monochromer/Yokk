'use strict'

const log = require('../helpers/logger');
const moment = require('moment');

exports.getStatistics = (req, res) => {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const UserModel = req.app.db.models.User;
    const statisticsToReturn = {};

    const statisticsPromises = [
        new Promise((resolve, reject) => {
            TimeEntryModel.find({}).exec((err, data) => {
                statisticsToReturn.timeEntries = data;
                resolve();
            });
        }),
        new Promise((resolve, reject) => {
            UserModel.find({}).exec((err, data) => {
                statisticsToReturn.users = data;
                resolve();
            });
        })
    ];

    Promise.all(statisticsPromises).then(() => {
        res.send(statisticsToReturn);
    })

}
