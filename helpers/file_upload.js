'use strict'

const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path')
const baseDir = path.join(__dirname, '../uploads/users/');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var userDir = baseDir + req.params.user_login;
        var avatarDir = `${userDir}/avatars/`;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
            fs.mkdirSync(avatarDir);
        }
        if (!fs.existsSync(avatarDir)) {
            fs.mkdirSync(avatarDir);
        }
        cb(null, avatarDir);
    },
    filename: function(req, file, cb) {
        cb(null, moment().format().split(':').join('-') + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage: storage
});
