'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function(app, mongoose) {
    var userSchema = new mongoose.Schema({
        login: {
            type: String,
            uniq: true,
            required: true
        },
        hashedPassword: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },

        fullname: String,
        position: String,
        email: String,
        phone: String,
        skype: String,
        workours: String,
        birthday: String,
        vk: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        aboutme: String,
        cv: String,
        profileImg: {
          original: String,
          small: String,
          medium: String
        },
        joinedon: {
            type: Date,
            default: null
        },
        role: {
            type: String,
            default: 'user'
        },
        redmineApiKey: String
    });

    methods(userSchema);
    statics(userSchema);

    app.db.model('User', userSchema);
}
