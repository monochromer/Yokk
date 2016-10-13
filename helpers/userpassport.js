'use strict'

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = function(app) {
    passport.use(new localStrategy(
        (login, password, cb) => {
            const userModel = app.db.models.User;
            // !!! not all the fields should be returned – check and refactor
            userModel.userAuthorize(login, (err, user) => {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    console.log('User ' + login + ' not found in DB');
                    return cb(null, false);
                }
                if (user.checkPassword(password)) {
                    return cb(null, user);
                } else {
                    console.log('Wrong password');
                    return cb(null, false);
                }
            });
        }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    // !!! not all the fields should be returned – check and refactor
    passport.deserializeUser((id, cb) => {
        const userModel = app.db.models.User;
        userModel.findOne({
            _id: id
        }, (err, user) => {
            if (err) {
                return cb(err);
            }
            //should be done in schemas Schema.statics.userAuthorize method
            let stripped_user = null
            if (user) {
                stripped_user = {
                    login: user.login,
                    role: user.role,
                };
            }
            cb(null, stripped_user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
}
