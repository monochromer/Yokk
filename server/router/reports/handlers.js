const moment = require('moment');
const toDate = require('../helpers/toDate').toDate;
const _ = require('lodash');

exports.createReport = function(req, res, next) {

  var query = {};
  var response = {};

  const userModel = req.app.db.models.User;
  const usersArray = req.query.users.split(',');

  const TimeEntryModel = req.app.db.models.timeEntry;

  getExecutors(usersArray, userModel).then(users => {
    return getTheReport(users);
  }).then(response => {
    res.status(200).send(response);
  })

  if (moment(req.query.from, 'DD.MM.YYYY').isValid())
    query["dateCreated"] = Object.assign({}, query['dateCreated'], {
      $gte: toDate(req.query.from)
    });

  if (moment(req.query.to, 'DD.MM.YYYY').isValid())
    query["dateCreated"] = Object.assign({}, query['dateCreated'], {
      $lte: toDate(req.query.to, 1)
    });

  function getExecutors(usersArray, userModel) {
    return new Promise((resolve, reject) => {
      userModel.find({
        login: {
          $in: usersArray
        }
      }, {
        _id: 1,
        login: 1
      }, (err, users) => {
        resolve(users);
      })
    })
  }

  function getTheReport(users) {
    query.executor = {$in: users};
    return new Promise((resolve, reject) => {
      TimeEntryModel.find(query).exec((err, entries) => {
        if (err) next(err);
        let data = {};

        for(let entryIdx = 0; entryIdx < entries.length; entryIdx++){
          var { entrySource, duration } = entries[entryIdx];

          var executor = _.find( users, user => user._id.toString() === entries[entryIdx].executor.toString() ).login;
          if (!data[executor]) {
            data[executor] = {
              total: duration,
              [entrySource]: duration
            }
          } else {
            data[executor]["total"] += duration;

            if (data[executor][entrySource]) {
              data[executor][entrySource] += duration;
            } else {
              data[executor][entrySource] = duration;
            }
          }
        }

        response = {
          query: query,
          data: data
        };

        resolve(response);
      });
    })
  }


};
