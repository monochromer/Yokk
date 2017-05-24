'use strict';

const jimp = require('jimp');
const log = require('../../helpers/logger');
const sendEmail = require('../helpers/sendEmail');
const async = require('async');
const moment = require('moment');
const fs = require('fs')
const path = require('path')

exports.getAllUsers = function (req, res) {
  const { User, Team } = req.app.db.models;
  const { user } = req;
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
            profileImg: foundUser.profileImg
          });
          if("" + foundUser._id === "" + user._id){
            userToReturn.email = user.email;
          }
          return userToReturn;
        });
        res.json(usersToReturn);
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
        const userIds = [];
        for(let index = 0; index < teams.length; index++){
          userIds.concat(teams[index].members.map(el => el.userId));
        }
        User.find({
          _id: {$in: userIds}
        }, (err, users) => {
          if(err){
            console.log(err);
            res.status(500).send('Server error');
            return false;
          }
          const usersToReturn = users.map((user) => {
            const profile = user.companies.find(
              el => ""+el.companyId === ""+currentCompany
            );
            if(!profile){
              return;
            }
            return Object.assign({}, profile.toObject(), {
              _id: user._id,
              profileImg: user.profileImg
            });
          });
          res.json(usersToReturn);
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
  const userModel = req.app.db.models.User;
  const { _id } = req.params;
  const update = req.body;

  if (req.body.password !== undefined) {
    userModel.findById(_id, (err, user) => {
      if(err){
        console.log(err);
        res.status(500).send("Server error");
        return false;
      }
      user.updatePassword(req.body.password);
      user.save((err, user) => {
        if(err){
          console.log(err);
          res.status(500).send("Server error");
          return false;
        }
        res.status(200).send();
      });

    });
  } else {
    userModel.editUser(_id, update, (err, user) => {
      if(err){
        console.log(err);
        res.status(500).send("Server error");
        return false;
      }
      res.status(200).send();
    });
  }
}

exports.deleteUser = function (req, res) {
  const { User, unconfirmedUser, Team } = req.app.db.models
  const { _id } = req.params
  const ObjectId = require('mongodb').ObjectID

  User.findOne({ _id }, (err, user) => {
    if (!user) {
      unconfirmedUser.findOne({ _id }, (err, user) => {
        user.remove()
      })
    } else {
      user.remove()
      Team.find({members: ObjectId(_id)}, (err, teams) => {
        teams.forEach(team => {
          team.members = team.members.filter(member => `${member}` !== _id )
          team.save()
        })
      })
    }
  })

  // User.deleteUser(req.params.id, (err, result) => {
  //   if (err) next(err);
  //   console.log(result);
  //   res.status(200).send(req.params.id);
  // });

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
