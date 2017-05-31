'use strict';

const moment = require('moment');
const stringToMinutes = require('../../helpers/issues').stringToMinutes;
const queryFiller = require('../helpers/queryFiller');

exports.timeEntryBatch = function(req, res) {
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
  //   query.date['$gte'] = from;
  //   } else {
  //   delete query.date['$gte']
  //   }
  //   if (to !== 'null') {
  //   query.date['$lte'] = to;
  //   } else {
  //   delete query.date['$lte']
  //   }
  // }

  const TimeEntryModel = req.app.db.models.timeEntry;
  const numberOfDocsToSkip = +req.query.skip || 0;
  const numberOfDocsToReturn = +req.query.limit;
  const maximumDocsToReturn = numberOfDocsToReturn + 20; //20 is possible additional entries that are needed to 'complete' the last returned date

  if (typeof req.query.user !== 'undefined') {
    query.executor = req.query.user;
  } else if (typeof req.user._id !== 'undefined') {
    query.executor = req.user._id;
  }
  if (typeof req.query.company !== 'undefined') {
    query.companyId = req.query.company;
  } else if (typeof req.user.currentCompany !== 'undefined') {
    query.companyId = req.user.currentCompany;
  }

  getTimeEntries(query);

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

};

exports.saveTimeEntry = function(req, res, next) {
  const TimeEntryModel = req.app.db.models.timeEntry

  const {description, duration, dateCreated, entrySource} = req.body
  const {_id} = req.user

  const timeEntryInitData = {
    description,
    duration,
    dateCreated,
    entrySource,
    executor: _id
  }

  const timeEntry = new TimeEntryModel(timeEntryInitData);

  if (req.body.date) {
    timeEntry.date = req.body.date;
  }

  if (req.body.startDate) {
    timeEntry.startDate = req.body.startDate;
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
