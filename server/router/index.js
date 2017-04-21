'use strict'

const authorization = require('./authorization');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn('/promo');
const helperRoutes = require('./helperRoutes');
const checkFrontPath = require('./frontPaths.js');
const path = require('path');
// const registration = require('./register');
const api = require('./api');

module.exports = function(app, passport) {

    // app.get('/', checkAuthStatus, authorization.index);
    // app.get('/login', authorization.login);
    // app.post('/login', passport.authenticate('local'), authorization.auth);

    // app.get('/logout', authorization.logout);

    // app.post('/register', registration, passport.authenticate('local', {
        // failureRedirect: '/login'
    // }), authorization.auth);

    app.use('/api', checkAuthStatus, api);

    // app.get('/promo/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../views', 'promo.html')));
    // app.get('/team/*', (req, res, next) => res.sendFile(path.resolve(__dirname, '../views', 'promo.html')));
    app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname,'/../../build/index.html')));

    app.get('*', checkAuthStatus, checkFrontPath, helperRoutes.redirectUndefinedRoutes);

}
