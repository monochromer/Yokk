'use strict';

const resize = require('../helpers/image_resize');
const log = require('../../../helpers/logger');
const sendEmail = require('../../helpers/sendEmail');
const async = require('async');

exports.getAllUsers = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const team = req.query.team;

    userModel.allUsers((err, user) => {
        if (err) next(err);
        res.send(user);
    });
};

exports.getTeamUsers = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const currentUser = req.user;

    getCurrentUserTeam(currentUser, userModel)
        .then(teamId => {
            return getTeamUsers(teamId, userModel);
        })
        .then(teamUsers => {
            res.status(200).send(teamUsers);
        })
        .catch(reason => {
            next(reason);
        })

    function getCurrentUserTeam(currentUserId, model) {
        return new Promise((resolve, reject) => {
            model.findOne({
                _id: currentUserId
            }, {
                _id: 0,
                team: 1
            }, (err, user) => {
                if (err) return reject(err);
                resolve(user.team);
            })
        })
    }

    function getTeamUsers(teamId, model) {
        return new Promise((resolve, reject) => {
            model.find({
                team: teamId
            }, (err, teamUsers) => {
                if (err) return reject(err);
                resolve(teamUsers);
            })
        })
    }
};

exports.saveUserToDb = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const user = new userModel(req.body);
    user.joinedon = Date.now();

    const teamModel = req.app.db.models.Team;
    const teamName = req.body.teamName;

    teamModel.findOne({
        teamLeadEmail: req.body.email
    }, (err, team) => {
        user.team = team._id;

        userModel.findByLogin(user.login, (err, dbUser) => {
            if (err) next(err);

            if (!dbUser) {
                user.save((err, user) => {
                    if (err) next(err);
                    res.status(200).send(user);
                    if (typeof req.body.email !== 'undefined') {
                        let credentials = {
                            login: req.body.login,
                            password: req.body.password,
                            email: req.body.email
                        };
                        let text;
                        let htmlToSend =
                            `<div>Login: <b>${credentials.login}</b></div>
                          <div>Password: <b>${credentials.password}</b></div>
                          <div><a href='http://eop.soshace.com/'>eop.soshace.com</a></div>`;

                        let mailOptions = {
                            from: '"Soshace team 👥" <bot@izst.ru>', // sender address
                            to: credentials.email, // list of receivers
                            subject: 'Congratulations! You\'re now registered user', // Subject line
                            text: text,
                            html: htmlToSend // html body
                        };
                        return sendEmail(mailOptions);
                    }
                    const logMsq = `User (login: ${user.login}) is saved to DB`;
                    return log(req, logMsq).info();
                });
            } else {
                const logMsq = `User (login: ${user.login}) is already in DB`;
                res.status(500).send();
                return log(req, logMsq).info()
            }
        });
    })
}

exports.showUser = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    userModel.findByLogin(login, (err, user) => {
        if (err) next(err);
        res.send(user);
        log(req).info();
    });
};

exports.updateUser = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const id = req.params.id;
    const update = req.body;

    if (req.body.password !== undefined) {
        userModel.findByLogin(login, (err, user) => {
            if (err) next(err);
            user.updatePassword(req.body.password);
            user.save((err, user) => {
                // seding passwords BAD
                res.status(200).send(user);
            });
            const logMsq = `User's password (login: ${user.login}) is updated`;

            return log(req, logMsq).info();

        });
    } else {
        userModel.editUser(id, update, (err, user) => {
            if (err) next(err);
            res.status(200).send(user);
        });
    }
}

exports.deleteUser = function(req, res, next) {
    const userModel = req.app.db.models.User;

    userModel.deleteUser(req.params.id, (err) => {
        if (err) next(err);
        res.status(200).send(req.params.id);
    });

}

exports.uploadUserAvatar = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;

    const requiredSizes = [
        '200-200',
        '400-400'
    ];

    let imageInfo = {};
    imageInfo.dir = req.file.destination;
    imageInfo.name = req.file.filename.split(':').join('-');

    async.waterfall([
        (callback) => {
            resize(imageInfo, requiredSizes, callback);
        },
        (callback) => {
            const originalImg = ('/' + req.file.path.split('/').slice(1).slice(-4).join('/')).split(':').join('-');
            const smallImg = ('/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[0] + '-' + req.file.filename).split(':').join('-');
            const mediumImg = ('/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[1] + '-' + req.file.filename).split(':').join('-');

            const update = {
                profileImg: {
                    original: originalImg,
                    small: smallImg,
                    medium: mediumImg,
                }
            };

            userModel.editUser(login, update, (err, user) => {
                if (err) next(err);
                res.status(200).send(user);
                callback(null);
            });
        }
    ], (err, user) => {
        if (err) next(err);
    });

};

exports.checkUserPermissions = function(req, res, next) {
    // as of now, returned fields can be adjusted in userpassport.js
    const userModel = req.app.db.models.User;
    userModel.findByLogin(req.user.login, (err, user) => {
        res.send(user);
    })

};
