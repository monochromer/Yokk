'use strict'

const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');
const baseDir = path.join(uploadDir, 'users');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const userDir = path.join(baseDir, req.params.user_login);
        const avatarDir = path.join(userDir, 'avatars', '/');

        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
        if (!fs.existsSync(userDir)) fs.mkdirSync(userDir);
        if (!fs.existsSync(avatarDir)) fs.mkdirSync(avatarDir);

        cb(null, avatarDir);
    },
    filename: function(req, file, cb) {
        cb(null, moment().format().split(':').join('-') + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage: storage
});
