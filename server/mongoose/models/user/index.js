'use strict'
import {
  NEW_USER_NOTIFICATION,
  NEW_TEAM_NOTIFICATION
} from '../../../constants';

var methods = require('./methods');
var statics = require('./statics');

module.exports = function (app, mongoose) {
  var userSchema = new mongoose.Schema({
    hashedPassword: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    resetPasswordSecret: String,
    email: {
      type: String,
      unique: true
    },
    emailConfirmed: {
      type: Boolean,
      default: false
    },
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
      type: Number,
      default: Date.now
    },
    companies: [{
      companyId: mongoose.Schema.Types.ObjectId,
      role: String,
      firstName: String,
      lastName: String,
      workours: String,
      position: String,
      badges: [mongoose.Schema.Types.ObjectId],
      profileEmail: String,
      gender: String,
      birthday: Number,
      cv: String,
      skills: String,
      phone: String,
      skype: String,
      twitter: String,
      address: String,
      facebook: String
    }],
    currentCompany: mongoose.Schema.Types.ObjectId,
    redmineHost: String,
    redmineApiKey: String,
    notifications: {
      type: [String],
      default: [
        NEW_USER_NOTIFICATION,
        NEW_TEAM_NOTIFICATION
      ]
    }
  });

  methods(userSchema);
  statics(userSchema);

  app.db.model('User', userSchema);
}
