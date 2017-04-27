'use strict';

var crypto = require('crypto');

module.exports = function(schema) {
  schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  };

  schema.virtual('password')
    .set(function(password) {
      this._plainPassword = password;
      this.salt = Math.random() + '';
      this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
      return this._plainPassword;
    });

  schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
  };

  schema.methods.updatePassword = function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  }
}
