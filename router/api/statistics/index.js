const handle = require('./handlers');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn();
const upload = require('../../../helpers/file_upload');

module.exports = function(api) {
    api.route('/statistics')
        .get(handle.getStatistics);
};

app.get('/api/statistics/', statisticsAPI.getStatistics);
