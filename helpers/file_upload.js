'use strict'

const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path')
const baseDir = path.join(__dirname, '../uploads/users/');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var userDir = baseDir + req.params.user_login;
        var avatarDir = `${userDir} /avatars/`;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
            fs.mkdirSync(avatarDir);
        }
        if (!fs.existsSync(avatarDir)) {
            fs.mkdirSync(avatarDir);
        }
        cb(null, avatarDir);
    },
    filename: (req, file, cb) => {
        cb(null, moment().format() + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage: storage
});
