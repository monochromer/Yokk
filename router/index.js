'use strict'

const authorization = require('./authorization');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn();
const userAPI = require('./userAPI');
const taskAPI = require('./taskAPI');
const helperRoutes = require('./helperRoutes');
const redmine = require('./redmine');
const upload = require('../helpers/file_upload');

module.exports = function(app, passport) {

    app.get('/', checkAuthStatus, authorization.index);
    app.get('/login', authorization.login);
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), authorization.auth);
    app.get('/logout', authorization.logout);

    app.get('/api/user', checkAuthStatus, userAPI.getAllUsers);
    app.post('/api/user/add', checkAuthStatus, userAPI.saveUserToDb);
    app.get('/api/user/check_permissions', userAPI.checkUserPermissions); //can cause conflicts when login is 'check_permissions'
    app.get('/api/user/:user_login', checkAuthStatus, userAPI.showUser);
    app.put('/api/user/:user_login', checkAuthStatus, userAPI.updateUser);
    app.delete('/api/user/:user_login', checkAuthStatus, userAPI.deleteUser);
    app.post('/api/user/:user_login/upload_profile_picture', checkAuthStatus, upload.single('pic'), userAPI.uploadUserAvatar);

    app.get('/api/task', checkAuthStatus, taskAPI.projectTasks);
    app.get('/api/task/duration', checkAuthStatus, taskAPI.totalDuration);
    app.post('/api/task/add', checkAuthStatus, taskAPI.saveTask); // body should contain: executor, description, taskSource
    app.delete('/api/task/:taskId', checkAuthStatus, taskAPI.deleteTask);
    app.put('/api/task/:taskId', checkAuthStatus, taskAPI.updateTask);

    app.get('/redmine/issues', redmine.issues); // add /limit/:num
    app.get('/redmine/projects', redmine.projects); // add /limit/:num
    app.get('/redmine/users', redmine.users); // server Returns forbidden
    app.get('/redmine/current_user', redmine.currentUser);


    app.get('*', checkAuthStatus, helperRoutes.redirectUndefinedRoutes);

}
