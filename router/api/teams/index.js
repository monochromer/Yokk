const handle = require('./handlers');

module.exports = function(api) {
    // api.route('/team/checkConfirmationCode/')
    //     .get(handle.checkConfirmationCode);
    api.route('/teams(/:teamName)?')
        .post(handle.create)
        .get(handle.read)
        .put(handle.update)
        .delete(handle.delete);
    api.route('/teams/:teamName/email/:email')
        .get(handle.confirmEmail)
        .delete(handle.deleteMeberFromTeam);
};
