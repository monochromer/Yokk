'use strict';

const moment = require('moment');
const stringToMinutes = require('../../../helpers/issues').stringToMinutes;
const queryFiller = require('../helpers/queryFiller');

exports.timeEntryBatch = function(req, res, next) {
    const {from, to} = req.query;

    if (req.query.from === 'undefined') {
        delete req.query.from;
    }
    if (req.query.to === 'undefined') {
        delete req.query.to;
    }

    const query = queryFiller(req.query); //CHECK!

    // if (req.query.dateStrings) {
    //   if (from !== 'null') {
    //     query.date['$gte'] = from;
    //   } else {
    //     delete query.date['$gte']
    //   }
    //   if (to !== 'null') {
    //     query.date['$lte'] = to;
    //   } else {
    //     delete query.date['$lte']
    //   }
    // }

    const TimeEntryModel = req.app.db.models.timeEntry;
    const numberOfDocsToSkip = +req.query.skip || 0;
    const numberOfDocsToReturn = +req.query.limit;
    const maximumDocsToReturn = numberOfDocsToReturn + 20; //20 is possible additional entries that are needed to 'complete' the last returned date

    if (typeof req.query.user !== 'undefined') {
        query.executor = req.query.user;
    } else if (typeof req.user.login !== 'undefined') {
        query.executor = req.user._id;
    }

    const getUserId = promiseUserId(req.query.login, req.app.db.models.User);

    if (!req.query.login) {
        getTimeEntries(query);
    } else {
        getUserId.then(userId => {
            query.executor = userId;
            getTimeEntries(query);
        })
    }

    function getTimeEntries(query) {
        TimeEntryModel
            .find(query)
            .sort({
                dateCreated: -1
            })
            .skip(numberOfDocsToSkip)
            .exec((err, timeEntries) => {
                if (err) next(err);

                for (let i = numberOfDocsToReturn - 1; i < maximumDocsToReturn - 1; i++) {
                    if (timeEntries.length <= numberOfDocsToReturn) {
                        return res.send(timeEntries);
                    }
                    if (!moment(timeEntries[i].dateCreated).isSame(moment(timeEntries[i + 1].dateCreated), 'day')) {
                        return res.send(timeEntries.slice(0, i + 1));
                    }
                }
                res.send(timeEntries);
            });
    }

    function promiseUserId(login, userModel) {
        if (!login) return;
        return new Promise((resolve, reject) => {
            userModel.findOne({
                login: login
            }, (err, user) => {
                resolve(user._id);
            })
        })
    }

};

exports.saveTimeEntry = function(req, res, next) {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const timeEntry = new TimeEntryModel(req.body);

    if (req.body.date) {
        timeEntry.date = moment(req.body.date, 'DD.MM.YYYY').toDate();
    }

    if (req.body.startDate) {
        timeEntry.startDate = moment(req.body.startDate, 'DD.MM.YYYY').toDate();
    }

    timeEntry.duration = stringToMinutes(req.body.duration);

    timeEntry.save((err, timeEntry) => {
        if (err) next(err);
        return res.status(200).send(timeEntry);
    });

};

exports.deleteTimeEntry = function(req, res, next) {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const timeEntryId = req.params.timeEntryId;

    TimeEntryModel.findByIdAndRemove(timeEntryId, (err) => {
        if (err) next(err);
        res.status(200).send(timeEntryId);
    });
};

exports.updateTimeEntry = function(req, res, next) {
    const TimeEntryModel = req.app.db.models.timeEntry;
    const timeEntryId = req.params.timeEntryId;
    const update = req.body;
    if(typeof(update.duration) != 'number') {
        update.duration = moment.duration(update.duration).asMinutes();
    }

    TimeEntryModel.findByIdAndUpdate(timeEntryId, update, {
        new: true
    }, (err, timeEntry) => {
        if (err) next(err);
        res.status(200).send(timeEntry);
    });
};
