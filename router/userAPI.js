'use strict'

const upload = require('../helpers/file_upload');
const log = require('../helpers/logger');

module.exports = function(app, passport) {

    app.get('/api/user', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
        var userModel = req.app.db.models.User;
        userModel.allUsers(function(err, user) {
            // returned fields can be adjusted in User schema
            if (err) {
                var logMsq = 'There was some error while gettin data on users from DB';
                log(req, logMsq).err();
                return res.send('Error. Look server logs.');
            }
            res.send(user);
        });
    });

    app.post('/api/users/add', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {

        var userModel = req.app.db.models.User;
        var user = new userModel(req.body);
        user.joinedon = Date.now();

        if (!user.login) {
            var logmsg = 'User login not specified';
            res.send({
                message: logmsg
            });
            return log(req, logmsg).err();
        }

        userModel.findByLogin(user.login, function(err, dbUser) {
            if (err) {
                res.send({
                    message: 'Some error occured while checking if user (login: ' +
                        user.login + ') in DB. Look server logs.'
                });
                return log(req, err).err();
            }
            if (!dbUser) {
                user.save(function(err, user) {
                    if (err) {
                        log(req, err).err();
                        return res.send({
                            message: 'Some error occured while saving user (login: ' +
                                user.login + ') in DB. Look server logs.'
                        });
                    };
                    var logMsq = 'User (login: ' + user.login + ') is saved to DB';
                    res.status(200).send(user);
                    return log(req, logMsq).info();
                });
            } else {
                var logMsq = 'User (login: ' + user.login + ') is already in DB';
                res.status(500).send({
                    message: logMsq
                });
                return log(req, logMsq).info()
            }

        });

    });

    app.get('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
        var userModel = req.app.db.models.User;
        var login = req.params.user_login;
        // returned fields can be adjusted in User schema
        userModel.findByLogin(login, function(err, user) {
            if (err) return log(req, err).err();
            log(req).info();
            res.send(user);
        });
    });


    app.put('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
        var userModel = req.app.db.models.User;
        var login = req.params.user_login;
        var update = req.body;
        userModel.editUser(login, update, function(err, user) {
            if (err) {
                var logMsq = 'There was some error while updating user data';
                log(req, logMsq).err();
                return res.send('Error. Look server logs.');
            }
            var logMsq = 'User (login: ' + user.login + ') is updated';
            log(req, logMsq).info()
            res.status(200).send(user);
        });
    });

    app.delete('/api/user/:user_login', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
        var userModel = req.app.db.models.User;
        var login = req.params.user_login;

        if (login === req.user.login) {
            userModel.deleteUser(login, function(err) {
                if (err) {
                    log(req, err).err();
                    return res.send({
                        message: 'Some error occured while deleting user (login: ' +
                            login + ') in DB. Look server logs.'
                    });
                };
                var logMsq = 'User ' + login + ' succesfully deleted';
                log(req, logMsq).info();
                req.logout();
                res.status(200).send({
                    action: 'Logout'
                }); //client side action logout
            });

        } else {
            userModel.deleteUser(login, function(err) {
                if (err) {
                    return log(req, err).err();
                };
                var logMsq = 'User ' + login + ' succesfully deleted';
                log(req, logMsq).info()
                res.status(200).send(login);
            });
        }
    });

    app.post('/api/upload_profile_picture/users/:user_login', function(req, res) {
        var userModel = req.app.db.models.User;
        var login = req.params.user_login;
        var update = {
            profileImg: '/users/' + login + '.jpg'
        };
        userModel.editUser(login, update, function(err, user) {
            if (err)
                res.send(err);
            if (user) {
                upload(req, res);
                res.status(200).send(user);
            } else {
                res.status(404).send({
                    message: 'User ' + login + ' is not found in DB'
                });
            }
        });
    });

}
