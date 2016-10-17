const handle = require('./handlers');

module.exports = function(api) {
    api.route('/report/').get(handle.createReport);
};