const handle = require('./handlers');
const upload = require('../../../helpers/file_upload');

module.exports = function(api) {
    api.route('/user/')
        .get(handle.getAllUsers)
        .post(handle.saveUserToDb);
    api.route('/user/get/team')
        .get(handle.getTeamUsers);
    api.route('/user/check_permissions')
        .get(handle.checkUserPermissions);
    api.route('/user/:user_login')
        .get(handle.showUser)
        .put(handle.updateUser)
        .delete(handle.deleteUser);
    api.route('/user/:user_login/upload_profile_picture')
        .post(upload.single('pic'), handle.uploadUserAvatar);
};
