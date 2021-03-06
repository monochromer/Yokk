'use strict'

var methods = require('./methods');
var statics = require('./statics');

module.exports = function (app, mongoose) {
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
        email: {
            type: String,
            uniq: true
        },
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
            original: {
                type: String,
                default: '/img/dummy/960-720.png'
            },
            small: {
                type: String,
                default: '/img/dummy/960-720.png'
            },
            medium: {
                type: String,
                default: '/img/dummy/960-720.png'
            }
        },
        joinedon: {
            type: Date,
            default: null
        },
        role: {
            type: String,
            default: 'user'
        },
        team: mongoose.Schema.Types.ObjectId,
        redmineHost: String,
        redmineApiKey: String
    });

    methods(userSchema);
    statics(userSchema);

    app.db.model('User', userSchema);
}
