const redmine = require('./redmine');

module.exports = function(api) {
    api.route('/sync/redmine').get(redmine);
}