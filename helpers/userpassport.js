'use strict'

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function(app) {
    passport.use(new localStrategy(
        function(username, password, cb) {
            var userModel = app.db.models.User;
            // !!! not all the fields should be returned – check and refactor
            userModel.userAuthorize(username, function(err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    console.log('User ' + username + ' not found in DB');
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

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    // !!! not all the fields should be returned – check and refactor
    passport.deserializeUser(function(id, cb) {
        var userModel = app.db.models.User;
        userModel.findOne({
            _id: id
        }, function(err, user) {
            if (err) {
                return cb(err);
            }
            //should be done in schemas Schema.statics.userAuthorize method
            var stripped_user = {};
            stripped_user.login = user.login;
            stripped_user.role = user.role;
            cb(null, stripped_user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
}
