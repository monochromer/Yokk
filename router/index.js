'use strict'

const authorization = require('./authorization');
const userAPI = require('./userAPI');
const helperRoutes = require('./helperRoutes');

const upload = require('../helpers/file_upload');

module.exports = function(app, passport) {

    app.get('/', require('connect-ensure-login').ensureLoggedIn(), authorization.index);
    app.get('/login', authorization.login);
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), authorization.auth);
    app.get('/logout', authorization.logout);

    app.get('/api/user', require('connect-ensure-login').ensureLoggedIn(), userAPI.getAllUsers);
    app.post('/api/users/add', require('connect-ensure-login').ensureLoggedIn(), userAPI.saveUserToDb);
    app.get('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), userAPI.showUser);
    app.put('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), userAPI.updateUser);
    app.delete('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), userAPI.deleteUser);
    app.post('/api/user/:user_login/upload_profile_picture', upload.single('pic'), userAPI.uploadUserAvatar);

    app.get('/api/check_permissions', helperRoutes.checkUserPermissions);
    app.get('*', require('connect-ensure-login').ensureLoggedIn(), helperRoutes.redirectUndefinedRoutes);

}
