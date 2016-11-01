const redmine = require('./redmine');
const upwork = require('./upwork');

module.exports = function(api) {
    api.route('/sync/redmine').get(redmine);
    api.route('/sync/upwork').get(upwork);
}
