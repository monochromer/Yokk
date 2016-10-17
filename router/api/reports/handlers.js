const moment = require('moment');
const toDate = require('../helpers/toDate').toDate;

exports.createReport = function(req, res, next) {

    var query = {};
    var response = {};
    
    const TimeEntryModel = req.app.db.models.timeEntry;

    if(moment(req.query.from, 'DD.MM.YYYY').isValid())
        query["dateCreated"] = Object.assign({}, query['dateCreated'], { $gte: toDate(req.query.from) });

    if(moment(req.query.to, 'DD.MM.YYYY').isValid())
        query["dateCreated"] = Object.assign({}, query['dateCreated'], { $lte: toDate(req.query.to, 1) });

    query.executor = { $in: req.query.users.split(',') };

    TimeEntryModel.find(query).exec( (err, entries) => {
        if(err) next(err);
        let data = {};

        entries.map( (entry) => {
            var { executor, entrySource, duration } = entry;
            if(!data[executor]) {
                data[executor] = {
                    total: duration,
                    [entrySource]: duration + 1
                }
            } else {
                data[executor]["total"] += duration;

                if(data[executor][entrySource]) {
                    data[executor][entrySource] += duration;
                } else {
                    data[executor][entrySource] = duration;
                }
            }
        });

        response = {
            query: query,
            data: data
        };

        res.status(200).send(response);
    });

};