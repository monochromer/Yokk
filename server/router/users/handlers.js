'use strict';

const jimp = require('jimp');
const log = require('../../helpers/logger');
const sendEmail = require('../helpers/sendEmail');
const async = require('async');
const moment = require('moment');
const fs = require('fs')
const path = require('path')
import { validatePassword, isValidName } from '../../helpers';
import validator from 'validator';
import _, { isEpmty } from 'lodash';
import { ObjectId } from 'mongodb';

exports.getAllUsers = function (req, res) {
  const { User, Team, UnconfirmedUser } = req.app.db.models;
  const { user } = req;
  if(!user){
    res.status(401).send();
    return false;
  }
  const { currentCompany } = user;
  const { role } = user.companies.find(
    el => "" + el.companyId === "" + currentCompany
  );

  Team.find({
    companyId: currentCompany,
    members: {$elemMatch: {userId: user._id, manager: true}}
  }, (err, teams) => {
    if(err){
      console.log(err);
      res.status(500).send('Server error');
      return false;
    }
    if(
      teams.length ||
      role === 'owner' ||
      role === 'admin'
    ){
      User.find({
        companies: {$elemMatch: {companyId: currentCompany}}
      }, (err, users) => {
        if(err){
          console.log(err);
          res.status(500).send('Server error');
          return false;
        }
        const usersToReturn = users.map((foundUser) => {
          const profile = foundUser.companies.find(
            el => ""+el.companyId === ""+currentCompany
          );
          if(!profile){
            return;
          }
          const userToReturn = Object.assign({}, profile.toObject(), {
            _id: foundUser._id,
            profileImg: foundUser.profileImg,
            notifications: foundUser.notifications
          });
          if(
            "" + foundUser._id === "" + user._id ||
            role === 'owner' ||
            role === 'admin'
          ){
            userToReturn.email = foundUser.email;
          }
          return userToReturn;
        });
        UnconfirmedUser.find({companyId: currentCompany}, (err, users) => {
          if(err){
            console.log(err);
            res.status(500).send('Server error');
            return false;
          }
          users.forEach((el) => {
            usersToReturn.push({
              firstName: 'Pending',
              lastName: 'invite',
              pending: true,
              email: el.email,
              role: el.role,
              _id: el._id
            });
          });
          res.json(usersToReturn);
        });
      });
    }
    else{
      Team.find({
        companyId: currentCompany,
        members: {$elemMatch: {userId: user._id}}
      }, (err, teams) => {
        if(err){
          console.log(err);
          res.status(500).send('Server error');
          return false;
        }
        let userIds = [];
        for(let index = 0; index < teams.length; index++){
          userIds = userIds.concat(teams[index].members.map(el => el.userId));
        }
        User.find({
          _id: {$in: userIds}
        }, (err, users) => {
          if(err){
            console.log(err);
            res.status(500).send('Server error');
            return false;
          }
          if(users.length){
            const usersToReturn = users.map((foundUser) => {
              const profile = foundUser.companies.find(
                el => ""+el.companyId === ""+currentCompany
              );
              if(!profile){
                return;
              }
              const userToReturn = Object.assign({}, profile.toObject(), {
                _id: foundUser._id,
                profileImg: foundUser.profileImg,
                notifications: foundUser.notifications
              });
              if(
                "" + foundUser._id === "" + user._id ||
                role === 'owner' ||
                role === 'admin'
              ){
                userToReturn.email = foundUser.email;
              }
              return userToReturn;
            });
            UnconfirmedUser.find({teamId: {$in: teams}}, (err, users) => {
              if(err){
                console.log(err);
                res.status(500).send('Server error');
                return false;
              }
              users.forEach((el) => {
                usersToReturn.push({
                  firstName: 'Pending',
                  lastName: 'invite',
                  pending: true,
                  role: el.role,
                  _id: el._id
                });
              });
              res.json(usersToReturn);
            });
            return;
          }
          const profile = user.companies.find(
            el => ""+el.companyId === ""+currentCompany
          );
          const currentUser = Object.assign({}, profile.toObject(), {
            _id: user._id,
            profileImg: user.profileImg,
            notifications: user.notifications,
            email: user.email
          });
          res.send([currentUser]);
        });
      });
    }
  });
};

exports.getTeamUsers = function (req, res) {
  const userModel = req.app.db.models.User;
  const currentUser = req.user;

  getCurrentUserTeam(currentUser, userModel)
    .then(teamId => {
      return getTeamUsers(teamId, userModel);
    })
    .then(teamUsers => {
      res.status(200).send(teamUsers);
    })
    .catch(reason => {
      console.log(reason);
      res.status(500).send();
    })

  function getCurrentUserTeam(currentUserId, model) {
    return new Promise((resolve, reject) => {
      model.findOne({
        _id: currentUserId
      }, {
        _id: 0,
        team: 1
      }, (err, user) => {
        if (err) return reject(err);
        if (!user) return reject('user not found');
        resolve(user.team);
      })
    })
  }

  function getTeamUsers(teamId, model) {
    return new Promise((resolve, reject) => {
      model.find({
        team: teamId
      }, (err, teamUsers) => {
        if (err) return reject(err);
        resolve(teamUsers);
      })
    })
  }
};

exports.saveUserToDb = function (req, res) {
  const { User, Company, Team } = req.app.db.models
  const user = new User(req.body)
  user.joinedon = Date.now()
  user.emailConfirmed = true

  const companyName = req.body.teamName

  Company.findOne({
    originatorEmail: req.body.email
  }, (err, company) => {
    if(err){
      console.log(err);
      res.status(500).send('Server error');
      return false;
    }
    if(!company){
      res.status(400).send('Company not found');
      return false;
    }

    user.companies = [company._id]

    User.findOne({email: user.email}, (err, dbUser) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return false;
      }

      if (dbUser) {
        const logMsq = `User (email: ${user.email}) is already in DB`;
        res.status(400).send(logMsq);
        return false;
      }
      user.save((err, user) => {
        if(err){
          console.log(err);
          res.status(500).send('Server error');
          return false;
        }
        const newTeam = new Team({members: [user._id]});
        newTeam.save((err, team) => {
          if(err){
            console.log(err);
            res.status(500).send('Server error');
            return false;
          }
          res.status(200).send({userId: user._id, teamId: team._id});

          company.teams.push(team._id);
          company.emailConfirmed = true;
          company.save();
          user.teams.push(team._id);
          user.save();
        })
      });
    });
  })

}

exports.showUser = function (req, res) {
  const userModel = req.app.db.models.User;
  const { _id } = req.params;
  userModel.findById(_id, (err, user) => {
    if(err){
      console.log(err);
      res.status(500).send("Server error");
      return false;
    }
    res.send(user);
  });
};

exports.updateUser = function (req, res) {
  const { User } = req.app.db.models;
  const { _id } = req.params;
  const { body, user } = req;
  const currentUserProfile = user.companies.find(
    el => "" + el.companyId === "" + user.currentCompany
  );
  const {
    email,
    passwordOld,
    passwordNew,
    passwordRepeat,
    role,
    currentCompany,
    notifications
  } = body;

  if (passwordNew !== undefined) {
    if(!user.checkPassword(passwordOld)){
      res.status(403).send({passwordOld: 'Wrong old password'});
      return;
    }
    const passwordErrors = validatePassword(passwordNew, passwordRepeat);
    if(passwordErrors){
      res.status(406).send(passwordErrors);
      return;
    }
    user.updatePassword(passwordNew);
    user.save((err) => {
      if(err){
        console.log(err);
        res.status(500).send({form: "Server error"});
        return false;
      }
      res.send();
    });
  }
  else if (email) {
    if(!validator.isEmail(email)){
      res.status(400).send({email: 'Invalid E-mail'});
      return;
    }
    user.email = email;
    user.save((err) => {
      if(err){
        console.log(err);
        res.status(500).send({form: "Server error"});
        return;
      }
      res.send();
    });
  }
  else if (notifications !== undefined) {
    if(notifications.constructor !== Array){
      res.status(400).send({notifications: 'Incorrect type'});
      return;
    }
    user.notifications = notifications;
    user.save((err) => {
      if(err){
        console.log(err);
        res.status(500).send({form: "Server error"});
        return;
      }
      res.send();
    });
  }
  else if (currentCompany) {
    if(!ObjectId.isValid(currentCompany)){
      res.status(400).send({form: 'Invalid company _id'});
      return;
    }
    user.currentCompany = currentCompany;
    user.save((err) => {
      if(err){
        console.log(err);
        res.status(500).send({form: "Server error"});
        return;
      }
      res.send();
      for(let ws in req.app.wsClients){
        if(req.app.wsClients[ws].userId === "" + user._id){
          req.app.wsClients[ws].send('fetch_initial_data');
        }
      }
    });
  }
  else if (role) {
    const currentUserRole = currentUserProfile.role;
    if(currentUserRole !== 'admin' & currentUserRole !== 'owner'){
      res.status(403).send({form: 'Not enough rights'});
      return;
    }
    User.findOne({_id}, (err, foundUser) => {
      if(!foundUser){
        res.status(400).send({form: 'User is not found'});
        return;
      }
      if(!foundUser.companies){
        res.status(400).send({form: 'User doesn\'t belong to any company'});
        return;
      }
      const foundUserProfile = foundUser.companies.find(
        el => "" + el.companyId === "" + user.currentCompany
      );
      if(!foundUserProfile){
        res.status(400).send({form: 'Profile is not found'});
        return;
      }
      if(foundUserProfile.role === 'owner'){
        res.status(403).send({form: 'You can\'t change owner\'s role'});
        return;
      }
      foundUserProfile.role = role;
      foundUser.save((err) => {
        if(err){
          console.log(err);
          res.status(500).send({form: "Server error"});
          return;
        }
        res.send();
      });
    });
  }
  else{
    const validProps = [
      'firstName',
      'lastName',
      'workHours',
      'position',
      'profileEmail',
      'gender',
      'birthday',
      'skills',
      'phone',
      'skype',
      'twitter',
      'address',
      'facebook'
    ];
    for(let prop in body){
      if(
        (prop === 'firstName' || prop === 'lastName') &&
        !isValidName(body[prop])
      ){
        res.status(400).send({[prop]: 'Invalid name'});
        return;
      }
      if(validProps.indexOf(prop) > -1){
        currentUserProfile[prop] = body[prop];
      }
    }
    user.save();
    res.send();
  }
}

exports.deleteUser = function (req, res) {
  const { User, UnconfirmedUser, Team, Notification } = req.app.db.models;
  const { _id } = req.params;
  const { companyId } = req.body;

  if (!companyId) {
    UnconfirmedUser.remove({_id}, (err) => {});
    res.send();
    return;
  }
  User.findOne({ _id }, (err, user) => {
    user.companies = user.companies.filter(
      el => "" + el.companyId !== companyId
    );
    user.save((err, user) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return;
      }
      if(!user.companies.length){
        Notification.remove({targetId: user._id}, (err) => {});
        user.remove();
        Team.find({members: {$elemMatch: {userId: user._id}}}, (err, teams) => {
          teams.forEach((team) => {
            team.members = team.members.filter(
              el => "" + el.userId !== "" + user._id
            );
            team.save();
          });
          res.send();
        });
      }
      else{
        Team.find({
          members: {$elemMatch: {userId: user._id}},
          companyId
        }, (err, teams) => {
          teams.forEach((team) => {
            team.members = team.members.filter(
              el => "" + el.userId !== "" + user._id
            );
            team.save();
          });
          res.send();
        });
      }
    });
  })
}

exports.uploadUserAvatar = function (req, res) {
  const userModel = req.app.db.models.User;
  const { _id } = req.params;

  const requiredSizes = [
    '200-200',
    '400-400'
  ];

  let imageInfo = {};
  imageInfo.dir = req.file.destination;
  imageInfo.name = req.file.filename.split(':').join('-');
  imageInfo.ext = req.file.mimetype.split('/')[1];
  imageInfo.date = moment().format("x");

  async.series([
      (callback) => {
        jimp.read(imageInfo.dir + imageInfo.name, function (err, image) {
          if(err){
            callback(err);
            return false;
          }
          image.cover(200, 200).write(imageInfo.dir + imageInfo.date + '200-200.' + imageInfo.ext, (err) => {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        });
      },
      (callback) => {
        jimp.read(imageInfo.dir + imageInfo.name, function (err, image) {
          if(err){
            callback(err);
            return false;
          }
          image.cover(400, 400).write(imageInfo.dir + imageInfo.date + '400-400.' + imageInfo.ext, (err) => {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        });
      },
      (callback) => {
        const originalImg = ('/' + req.file.path.split('/').slice(1).slice(-4).join('/')).split(':').join('-');
        const smallImg = '/users/' + _id + '/avatars/' + imageInfo.date + '200-200.' + imageInfo.ext;
        const mediumImg = '/users/' + _id + '/avatars/' + imageInfo.date + '400-400.' + imageInfo.ext;

        const update = {
          profileImg: {
            original: originalImg,
            small: smallImg,
            medium: mediumImg,
          }
        };

        userModel.editUser(_id, update, (err, user) => {
          if(err){
            console.log(err);
            res.status(500).send();
            return false;
          }
          res.status(200).send(update);
          callback(null, user);
        });
      }
    ],
    (err, user) => {
      if(err){
        console.log(err);
        res.status(500).send();
        return false;
      }
    }
  )
};

exports.deleteUserAvatar = function (req, res) {
  const userModel = req.app.db.models.User
  const { _id } = req.params;
  const baseDir = path.join(__dirname, '../../uploads/users/')
  const dirToDelete = `${baseDir}/${_id}/avatars`

  deleteFolderRecursive(dirToDelete);

  const update = {
    profileImg: {
      small: '/img/dummy/960-720.png',
      medium: '/img/dummy/960-720.png',
      original: 'public/img/dummy/960-720.png'
    }
  }

  userModel.editUser(_id, update, (err, user) => {
    if(err){
      console.log(err);
      res.status(500).send();
      return false;
    }
    res.status(200).send(user);
  });

  function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }

}

exports.getLoggedInUser = function (req, res) {
  const { User, Company, Team } = req.app.db.models;
  const { user } = req;
  if(!user){
    res.status(401).send('Unauthorized');
    return false;
  }
  const profile = user.companies.find(
    el => ""+el.companyId === ""+user.currentCompany
  );
  if(!profile){
    res.status(500).send('Server error');
    return false;
  }
  const userToReturn = Object.assign({}, profile.toObject(), {
    _id: user._id,
    email: user.email,
    profileImg: user.profileImg,
    currentCompany: user.currentCompany
  });
  const companyIds = user.companies.map(el => el.companyId);
  Company.find({ _id: { $in: companyIds } }, {
    _id: 1,
    name: 1,
    address: 1,
    billingInfo: 1
  }, (err, companies) => {
    if(err){
      console.log(err);
      res.status(500).send();
      return false;
    }
    Team.find({
      companyId: userToReturn.currentCompany,
      members: {$elemMatch: {userId: userToReturn._id}}
    }, {
      _id: 1,
      name: 1,
      members: 1
    }, (err, teams) => {
      if(err){
        console.log(err);
        res.status(500).send();
        return false;
      }
      res.json({user: userToReturn, companies, teams})
    });
  });
}
