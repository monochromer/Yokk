const handle = require('./handlers');

module.exports = function(api) {
    api.route('/team(/:name)?')
        .post(handle.create)
        .get(handle.read)
        .put(handle.update)
        .delete(handle.delete)
};
