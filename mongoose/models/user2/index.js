'use strict'

const methods = require('./methods');
const statics = require('./statics');

module.exports = (app, mongoose) => {
    const userSchema = new mongoose.Schema({
        login: {
            type: String,
            uniq: true,
            required: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
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
        profileImg: String,
        joinedon: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            default: 'user',
        },
        redmineApiKey: String,
    });

    methods(userSchema);
    statics(userSchema);

    app.db.model('User', userSchema);
}
