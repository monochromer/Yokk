'use strict'

const log = require('../helpers/logger');

exports.saveTaskToDb = function(req, res) {

    var taskModel = req.app.db.models.taskSchema;

    // req.body should contain required field:
    // - executor
    // - description
    // - taskSource
    var task = new taskModel(req.body);

    if (!task.executor && !task.description && !task.taskSource) {
        // TODO Return not specified field
        var logmsg = 'One of the required fields is not specified';
        res.send({
            message: logmsg
        });
        return log(req, logmsg).err();
    }

    // TODO generate taskNumber????

    task.save(function(err, task) {
        if (err) {
            log(req, err).err();
            return res.send({
                message: 'Some error occured while saving task (login: ' +
                    task.taskNumber + ') in DB. Look server logs.'
            });
        };
        var logMsq = 'Task (login: ' + task.taskNumber + ') is saved to DB';
        res.status(200).send(task);
        return log(req, logMsq).info();
    });

}
