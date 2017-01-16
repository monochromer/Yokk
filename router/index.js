'use strict'

const authorization = require('./authorization');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn('/registration');
const helperRoutes = require('./helperRoutes');
const checkFrontPath = require('./frontPaths.js');
const path = require('path');
const registration = require('./register');
const api = require('./api');

module.exports = function(app, passport) {

    app.get('/', checkAuthStatus, authorization.index);
    app.get('/login', authorization.login);
    app.post('/login', passport.authenticate('local'), authorization.auth);

    app.get('/logout', authorization.logout);

    app.post('/register', registration, passport.authenticate('local', {
        failureRedirect: '/login'
    }), authorization.auth);

    app.use('/api', api);

    app.get('/registration/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../views', 'registration.html')));
    app.get('/team/*', (req, res, next) => res.sendFile(path.resolve(__dirname, '../views', 'registration.html')));

    app.get('*', checkAuthStatus, checkFrontPath, helperRoutes.redirectUndefinedRoutes);

}
