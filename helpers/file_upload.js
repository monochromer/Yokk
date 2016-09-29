'use strict'

var multer = require('multer');

var storage = multer.diskStorage({
    destination: './uploads/users/',
    filename: function(req, file, cb) {
        cb(null, req.params.user_login + '-' + Date.now() + '.jpg');
    }
});

module.exports = multer({
    storage: storage
});
