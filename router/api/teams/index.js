const handle = require('./handlers');

module.exports = function(api) {
    api.route('/teams/addTeamMembers')
        .post(handle.addTeamMembers)
    api.route('/teams(/:teamName)?')
        .post(handle.create)
        .get(handle.read)
        .put(handle.update)
        .delete(handle.delete);
    api.route('/teams/:teamName/email/:email')
        .delete(handle.deleteMeberFromTeam);
    api.route('/teams/resendCode')
        .get(handle.resendCode);
};
