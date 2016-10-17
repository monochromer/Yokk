const handle = require('./handlers');

module.exports = function(api) {
    api.route('/timeEntryBatch')
        .get(handle.timeEntryBatch);
    api.route('/timeEntry/')
        .post(handle.saveTimeEntry);
    api.route('/timeEntry/:timeEntryId')
        .delete(handle.deleteTimeEntry)
        .put(handle.updateTimeEntry);
    api.route('/sync/redmine')
        .get(handle.importRedmineIssues);
};
