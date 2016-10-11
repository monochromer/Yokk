'use strict'

const authorization = require('./authorization');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn();
const userAPI = require('./userAPI');
const timeEntryAPI = require('./timeEntryAPI');
const statisticsAPI = require('./statisticsAPI.js');
const helperRoutes = require('./helperRoutes');
const redmine = require('./redmine');
const upload = require('../helpers/file_upload');
const checkFrontPath = require('./frontPaths.js');
const path = require('path');

module.exports = (app, passport) => {

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

    app.get('/api/timeEntryBatch', timeEntryAPI.timeEntryBatch);
    app.get('/api/timeEntry/duration', checkAuthStatus, timeEntryAPI.totalDuration);
    app.post('/api/timeEntry/add', checkAuthStatus, timeEntryAPI.saveTimeEntry); // body should contain: executor, description, taskSource
    app.delete('/api/timeEntry/:timeEntryId', checkAuthStatus, timeEntryAPI.deleteTimeEntry);
    app.put('/api/timeEntry/:timeEntryId', checkAuthStatus, timeEntryAPI.updateTimeEntry);

    app.get('/api/statistics/', statisticsAPI.getStatistics);

    app.get('/redmine/sync', checkAuthStatus, redmine.importRedmineIssues);

    app.get('*', checkAuthStatus, checkFrontPath, helperRoutes.redirectUndefinedRoutes);

}
