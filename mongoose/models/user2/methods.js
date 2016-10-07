'use strict';

const crypto = require('crypto');

module.exports = (schema) => {
    schema.methods.encryptPassword = (password) => {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    };

    schema.virtual('password')
        .set((password) => {
            this._plainPassword = password;
            this.salt = Math.random() + '';
            this.hashedPassword = this.encryptPassword(password);
        })
        .get(() => {
            return this._plainPassword;
        });
console.log(schema.methods);
    schema.methods.checkPassword = (password) => {
        return this.encryptPassword(password) === this.hashedPassword;
    };
}
