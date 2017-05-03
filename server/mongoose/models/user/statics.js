'use strict';

module.exports = function(schema) {
  schema.statics.allUsers = function(cb) {
    var fieldsToReturn = {
      _id: 1,
      fullname: 1,
      position: 1,
      email: 1,
      phone: 1,
      skype: 1,
      workhours: 1,
      birthday: 1,
      vk: 1,
      twitter: 1,
      facebook: 1,
      linkedin: 1,
      aboutme: 1,
      cv: 1,
      profileImg: 1,
      joinedon: 1,
      role: 1,
      redmineApiKey: 1
    }
    return this.find({}, fieldsToReturn, cb);
  };

  schema.statics.findByEmail = function(email, cb) {
    var fieldsToReturn = {
      _id: 1,
      email: 1,
      team: 1,
      role: 1,
      profileImg: 1,
      companies: 1,
      teams: 1
    }
    return this.findOne({
      email: email
    }, fieldsToReturn, cb);
  };

  schema.statics.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
  };

  schema.statics.editUser = function(id, updateObject, cb) {
    return this.findOneAndUpdate({
      _id: id
    }, updateObject, {
      new: true
    }, cb);
  };

  schema.statics.deleteUser = function(id, cb) {
    return this.remove({
      _id: id
    }, cb);
  };
}
