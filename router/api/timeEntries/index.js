const handle = require('./handlers');

module.exports = function(api) {
    api.route('/timeEntry/')
        .get(handle.timeEntryBatch)
        .post(handle.saveTimeEntry);
    api.route('/timeEntry/:timeEntryId')
        .delete(handle.deleteTimeEntry)
        .put(handle.updateTimeEntry);
};
