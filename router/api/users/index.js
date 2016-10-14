const handle = require('./handlers');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn();
const upload = require('../../../helpers/file_upload');

module.exports = function(api) {
    api.route('/user')
        .get(handle.getAllUsers)
    api.route('/user/add')
        .post(handle.saveUserToDb);
    api.route('/user/check_permissions')
        .get(handle.checkUserPermissions); //can cause conflicts when login is 'check_permissions'
    api.route('/user/:user_login')
        .get(handle.showUser)
        .put(handle.updateUser)
        .delete(handle.deleteUser);
    api.route('/user/:user_login/upload_profile_picture')
        .post(upload.single('pic'), handle.uploadUserAvatar);
};
