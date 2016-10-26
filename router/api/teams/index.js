const handle = require('./handlers');

module.exports = function(api) {
    // api.route('/team/checkConfirmationCode/')
    //     .get(handle.checkConfirmationCode);
    api.route('/team(/:name)?')
        .post(handle.create)
        .get(handle.read)
        .put(handle.update)
        .delete(handle.delete);
};
