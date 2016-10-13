'use strict'

const log = require('../helpers/logger');

exports.regtest = function(req, res) {
    let nodemailer = require('nodemailer');
    let smtpConfig = {
        host: 'smtp.gmail.ru',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASS
        },
        rejectUnauthorized: false
    };
    console.log(smtpConfig);

    let transporter = nodemailer.createTransport(smtpConfig);

    var mailOptions = {
        from: '"Soshace team 👥" <HELLO@SOSHACE.COM>', // sender address
        to: 'olegzhermal@gmail.com', // list of receivers
        subject: 'Confirm registration', // Subject line
        text: 'Hello Username! Your password is.. In order to start using your account confirm your email', // plaintext body
        html: '<a>Here should be a confirmation link</a>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('fuck');
            return res.send(error);
        }
        res.send('Message sent: ' + info.response);
    });
}
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

exports.saveUserToDb = function(req, res) {
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

exports.showUser = function(req, res) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    userModel.findByLogin(login, (err, user) => {
        if (err) return log(req, err).err();
        res.send(user);
        log(req).info();
    });
}

exports.updateUser = function(req, res) {
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
                res.status(200).send();
            });
            const logMsq = `User's password (login: ${user.login}) is updated`;

            return log(req, logMsq).info()

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

exports.deleteUser = function(req, res) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const rmdir = require('../helpers/rmdir');
    const path = require('path');

    if (login === req.user.login) { //deleting current user
        userModel.deleteUser(login, (err) => {
            if (err) {
                res.status(500).send();
                return log(req, err).err();
            };
            res.status(200).send({
                action: 'Logout'
            });
            req.logout();
            rmdir(path.join(__dirname, '../uploads/users/', login));
            const logMsq = `User ${login} succesfully deleted`;
            log(req, logMsq).info();
        });

    } else { //deleting any other user (admins can do)
        userModel.deleteUser(login, (err) => {
            if (err) {
                return log(req, err).err();
            };
            res.status(200).send(login);
            rmdir(path.join(__dirname, '../uploads/users/', login));
            const logMsq = `User ${login} succesfully deleted`;
            log(req, logMsq).info()
        });
    }
}

exports.uploadUserAvatar = function(req, res) {
    const userModel = req.app.db.models.User;
    const login = req.params.user_login;
    const path = require('path');
    const resize = require('../helpers/image_resize');
    const replaceAll = require('../helpers/replace');

    // element of the array typeof STRING
    // first number in the string is width, second – height
    // no crop is done
    // resized images are saved in the same directory with the 'width-height:' prefix
    const requiredSizes = [
        '57-57',
        '200-200'
    ];

    let imageInfo = {};
    imageInfo.dir = req.file.destination;
    imageInfo.name = req.file.filename.split(':').join('-');
    resize(imageInfo, requiredSizes)

    const originalImg = ('/' + req.file.path.split('/').slice(1).slice(-4).join('/')).split(':').join('-');
    const smallImg = ('/' + req.file.destination.split('/').slice(1).slice(-4).join('/') + requiredSizes[0] + '-' + req.file.filename).split(':').join('-');;
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
        if (err || !user) {
            res.status(404).send();
        } else {
            res.status(200).send(user);
        }
    });
}

exports.checkUserPermissions = function(req, res) {
    // as of now, returned fields can be adjusted in userpassport.js
    res.send(req.user);
}
