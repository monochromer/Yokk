'use strict'

const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const path = require('path')
const baseDir = path.join(__dirname, '../uploads/');
const usersDir = baseDir + '/users/';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var userDir = usersDir + req.params._id;
    var avatarDir = `${userDir}/avatars/`;
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir);
    }
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
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
