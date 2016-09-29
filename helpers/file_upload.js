'use strict'

var multer = require('multer');
var moment = require('moment');
var fs = require('fs');
var path = require('path')
var baseDir = path.join(__dirname, '../uploads/users/');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var userDir = baseDir + req.params.user_login;
        var avatarDir = userDir + '/avatars/';
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
        cb(null, moment().format() + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage: storage
});
