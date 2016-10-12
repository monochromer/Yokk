'use strict'

const log = require('../helpers/logger');

exports.getAllUsers = (req, res) => {
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

exports.saveUserToDb = (req, res) => {
    const userModel = req.app.db.models.User;
    const user = new userModel(req.body);
    user.joinedon = Date.now();

    if (!user.login) {
        const logmsg = 'User login not specified';
        res.send({
            message: logmsg
        });
        return log(req, logmsg).err();
    }

    userModel.findByLogin(user.login, (err, dbUser) => {
        if (err) {
            res.status(500).send();
            return log(req, err).err();
        }
        if (!dbUser) {
            user.save((err, user) => {
                if (err) {
                    log(req, err).err();
                    return res.status(500).send();
                };
                const logMsq = `User (login: ${user.login}) is saved to DB`;
                res.status(200).send(user);
                return log(req, logMsq).info();
            });
        } else {
            const logMsq = `User (login: ${user.login}) is already in DB`;
            res.status(500).send();
            return log(req, logMsq).info()
        }
    });
}

exports.showUser = (req, res) => {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    userModel.findByLogin(login, (err, user) => {
        if (err) return log(req, err).err();
        log(req).info();
        res.send(user);
    });
}

exports.updateUser = (req, res) => {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const update = req.body;
    userModel.editUser(login, update, (err, user) => {
        if (err) {
            const logMsq = 'There was some error while updating user data';
            log(req, logMsq).err();
            return res.status(500).send();
        }
        const logMsq = `User (login: ${login}) is updated`;
        log(req, logMsq).info();
        console.log(user);
        res.status(200).send(user);
    });
}

exports.deleteUser = (req, res) => {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const rmdir = require('../helpers/rmdir');
    const path = require('path');

    if (login === req.user.login) { //deleting current user
        userModel.deleteUser(login, (err) => {
            if (err) {
                log(req, err).err();
                return res.status(500).send();
            };
            rmdir(path.join(__dirname, '../uploads/users/', login));
            const logMsq = `User ${login} succesfully deleted`;
            log(req, logMsq).info();
            req.logout();
            res.status(200).send({
                action: 'Logout'
            }); //client side action logout
        });

    } else { //deleting any other user (admins can do)
        userModel.deleteUser(login, (err) => {
            if (err) {
                return log(req, err).err();
            };
            rmdir(path.join(__dirname, '../uploads/users/', login));
            const logMsq = `User ${login} succesfully deleted`;
            log(req, logMsq).info()
            res.status(200).send(login);
        });
    }
}

exports.uploadUserAvatar = function(req, res) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const path = require('path');
    const momemnt = require('moment');
    const resize = require('../helpers/image_resize');

    // element of the array typeof STRING
    // first number in the string is width, second – height
    // no crop is done
    // resized images are saved in the same directory with the 'width-height:' prefix
    const requiredSizes = [
        '57-57',
        '200-200'
    ];

    const imageInfo = {};
    imageInfo.dir = req.file.destination;
    imageInfo.name = req.file.filename;
    resize(imageInfo, requiredSizes)

    const originalImg = '/' + req.file.path.split('/').slice(1).slice(-4).join('/');
    const smallImg = '/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[0] + ':' + req.file.filename;
    const mediumImg = '/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[1] + ':' + req.file.filename;

    // Below could be used if there is no defined Schema (pure Mongo):
    // requiredSizes.forEach((size) => {
    //     updateFoo.profileImg[size] = '/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + size + ':' + req.file.filename;
    // })

    // IF update object structure is changed, don't forget to change Mongoose model
    const updateFoo = {
        profileImg: {
            original: originalImg,
            small: smallImg,
            medium: mediumImg,
        }
    };

    userModel.editUser(login, updateFoo, (err, user) => {
        if (err || !user) {
            res.status(404).send();
        } else {
            res.status(200).send(user);
        }
    });
}

exports.checkUserPermissions = (req, res) => {
    // as of now, returned fields can be adjusted in userpassport.js
    res.send(req.user);
}
