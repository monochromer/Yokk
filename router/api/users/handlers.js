'use strict'

const log = require('../../../helpers/logger');
const sendLoginPasswordToEmail = require('../../helpers/sendLoginPassword');

exports.getAllUsers = function(req, res) {
    const userModel = req.app.db.models.User;
    userModel.allUsers((err, user) => {
        // returned fields can be adjusted in User schema
        if (err) {
            const logMsq = 'There was some error while gettin data on users from DB';
            log(req, logMsq).err();
            return res.status(500).send();
        }
        res.send(user);
    });
}

exports.saveUserToDb = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const user = new userModel(req.body);
    user.joinedon = Date.now();


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
                    return sendLoginPasswordToEmail(credentials);
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
}

exports.showUser = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    userModel.findByLogin(login, (err, user) => {
        if (err) return log(req, err).err();
        res.send(user);
        log(req).info();
    });
}

exports.updateUser = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const update = req.body;

    if (req.body.password !== undefined) {
        userModel.findByLogin(login, (err, user) => {
            if (err) {
                res.status(500).send();
                return log(req, err).err();
            }
            user.updatePassword(req.body.password);
            user.save((err, user) => {
                // seding passwords BAD
                res.status(200).send(user);
            });
            const logMsq = `User's password (login: ${user.login}) is updated`;

            return log(req, logMsq).info();

        });
    } else {
        userModel.editUser(login, update, (err, user) => {
            if (err) {
                res.status(500).send();
                const logMsq = 'There was some error while updating user data';
                log(req, logMsq).err();
            } else {
                res.status(200).send(user);
                const logMsq = `User (login: ${login}) is updated`;
                log(req, logMsq).info();
            }
        });
    }
}

exports.deleteUser = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const rmdir = require('../helpers/rmdir');
    const path = require('path');

    userModel.deleteUser(login, (err) => {
        if (err) next(err);
        res.status(200).send(login);
        rmdir(path.join(__dirname, '../uploads/users/', login));
        const logMsq = `User ${login} succesfully deleted`;
        log(req, logMsq).info()
    });

}

exports.uploadUserAvatar = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const path = require('path');
    const resize = require('../helpers/image_resize');

    // element of the array typeof STRING
    // first number in the string is width, second – height
    // no crop is done
    // resized images are saved in the same directory with the 'width-height:' prefix
    const requiredSizes = [
        '200-200',
        '400-400'
    ];

    let imageInfo = {};
    imageInfo.dir = req.file.destination;
    imageInfo.name = req.file.filename.split(':').join('-');
    resize(imageInfo, requiredSizes);

    const originalImg = ('/' + req.file.path.split('/').slice(1).slice(-4).join('/')).split(':').join('-');
    const smallImg = ('/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[0] + '-' + req.file.filename).split(':').join('-');
    const mediumImg = ('/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[1] + '-' + req.file.filename).split(':').join('-');

    // Below could be used if there is no defined Schema (pure Mongo):
    // requiredSizes.forEach((size) => {
    //     updateFoo.profileImg[size] = '/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + size + ':' + req.file.filename;
    // })

    // IF update object structure is changed, don't forget to change Mongoose model
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

    });
}

exports.checkUserPermissions = function(req, res, next) {
    // as of now, returned fields can be adjusted in userpassport.js
    res.send(req.user);
}
