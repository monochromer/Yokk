'use strict'

const authorization = require('./authorization');
const userAPI = require('./userAPI');
const taskAPI = require('./taskAPI');
const helperRoutes = require('./helperRoutes');
const redmine = require('./redmine');
const upload = require('../helpers/file_upload');

const getTasksRouterParameters = ['from', 'to', 'user', 'source'];
const appGetTasks = require('./routerHelpers/permutateRoutes')(getTasksRouterParameters);

module.exports = function(app, passport) {

    app.get('/', require('connect-ensure-login').ensureLoggedIn(), authorization.index);
    app.get('/login', authorization.login);
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), authorization.auth);
    app.get('/logout', authorization.logout);

    app.get('/api/user', require('connect-ensure-login').ensureLoggedIn(), userAPI.getAllUsers);
    app.post('/api/user/add', require('connect-ensure-login').ensureLoggedIn(), userAPI.saveUserToDb);
    app.get('/api/user/check_permissions', userAPI.checkUserPermissions); //can cause conflicts when login is 'check_permissions'
    app.get('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), userAPI.showUser);
    app.put('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), userAPI.updateUser);
    app.delete('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), userAPI.deleteUser);
    app.post('/api/user/:user_login/upload_profile_picture', upload.single('pic'), userAPI.uploadUserAvatar);

    appGetTasks.forEach((route) => app.get(route), taskAPI.projectTasks)
    app.get('/api/task(/from.:from)?(/to.:to)?(/user.:user)?(/source.:source)?', taskAPI.projectTasks);
    app.post('/api/task/add', taskAPI.saveTask); // body should contain: executor, description, taskSource
    app.delete('/api/task/:taskNumber', require('connect-ensure-login').ensureLoggedIn(), taskAPI.deleteTask);
    app.put('/api/task/:taskNumber', require('connect-ensure-login').ensureLoggedIn(), taskAPI.updateTask);

    app.get('/redmine/issues', redmine.issues); // add /limit/:num
    app.get('/redmine/projects', redmine.projects); // add /limit/:num
    app.get('/redmine/users', redmine.users); // server Returns forbidden
    app.get('/redmine/current_user', redmine.currentUser);


    app.get('*', require('connect-ensure-login').ensureLoggedIn(), helperRoutes.redirectUndefinedRoutes);

}
