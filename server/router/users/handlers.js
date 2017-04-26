'use strict';

const jimp = require('jimp');
const log = require('../../helpers/logger');
const sendEmail = require('../helpers/sendEmail');
const async = require('async');
const moment = require('moment');
const fs = require('fs')
const path = require('path')

exports.getAllUsers = function (req, res, next) {
  const userModel = req.app.db.models.User;
  const team = req.query.team;

  userModel.allUsers((err, user) => {
    if (err) next(err);
    res.send(user);
  });
};

exports.getTeamUsers = function (req, res, next) {
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
      next(reason);
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

exports.saveUserToDb = function (req, res, next) {
  const { User, Company, Team } = req.app.db.models
  const user = new User(req.body)
  user.joinedon = Date.now()

  const companyName = req.body.teamName

  Company.findOne({
    originatorEmail: req.body.email
  }, (err, company) => {

    user.companies = [company._id]

    User.findByLogin(user.login, (err, dbUser) => {
      if (err) next(err);

      if (!dbUser) {
        user.save((err, user) => {
          if (err) next(err)

          res.status(200).send(user)

          const teamInitData = {
            created: Date.now(),
            members: [user._id]
          }

          const newTeam = new Team(teamInitData)
          newTeam.save((err, team) => {
            company.teams.push(team._id)
            company.save()

            user.teams.push(team._id)
            user.save()
          })

          if (typeof req.body.email !== 'undefined') {
            let credentials = {
              login: req.body.login,
              password: req.body.password,
              email: req.body.email
            };
            let text;
            let htmlToSend =
              `<div>Login: <b>${credentials.login}</b></div>
                          <div>Password: <b>${credentials.password}</b></div>
                          <div><a href='http://eop.soshace.com/'>eop.soshace.com</a></div>`;

            let mailOptions = {
              from: '"Soshace team 👥" <bot@izst.ru>', // sender address
              to: credentials.email, // list of receivers
              subject: 'Congratulations! You\'re now registered user', // Subject line
              text: text,
              html: htmlToSend // html body
            };
            return sendEmail(mailOptions);
          }
          const logMsq = `User (login: ${user.login}) is saved to DB`;
          return log(req, logMsq).info();
        });
      } else {
        const logMsq = `User (login: ${user.login}) is already in DB`;
        res.status(500).send();
        return log(req, logMsq).info()
      }
    });
  })

}

exports.showUser = function (req, res, next) {
  const userModel = req.app.db.models.User;
  const login = req.params.user_login;
  userModel.findByLogin(login, (err, user) => {
    if (err) next(err);
    res.send(user);
    log(req).info();
  });
};

exports.updateUser = function (req, res, next) {
  const userModel = req.app.db.models.User;
  const id = req.params.id;
  const update = req.body;

  if (req.body.password !== undefined) {
    userModel.findByLogin(login, (err, user) => {
      if (err) next(err);
      user.updatePassword(req.body.password);
      user.save((err, user) => {
        // seding passwords BAD
        res.status(200).send(user);
      });
      const logMsq = `User's password (login: ${user.login}) is updated`;

      return log(req, logMsq).info();

    });
  } else {
    userModel.editUser(id, update, (err, user) => {
      if (err) next(err);
      res.status(200).send(user);
    });
  }
}

exports.deleteUser = function (req, res, next) {
  const { User, unconfirmedUser, Team } = req.app.db.models
  const { id } = req.params
  const ObjectId = require('mongodb').ObjectID

  User.findOne({ _id: id }, (err, user) => {
    if (!user) {
      unconfirmedUser.findOne({ _id: id }, (err, user) => {
        user.remove()
      })
    } else {
      user.remove()
      Team.find({members: ObjectId(id)}, (err, teams) => {
        teams.forEach(team => {
          team.members = team.members.filter(member => `${member}` !== id )
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

exports.uploadUserAvatar = function (req, res, next) {
  const userModel = req.app.db.models.User;
  const login = req.params.user_login;

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
        const smallImg = '/users/' + login + '/avatars/' + imageInfo.date + '200-200.' + imageInfo.ext;
        const mediumImg = '/users/' + login + '/avatars/' + imageInfo.date + '400-400.' + imageInfo.ext;

        const update = {
          profileImg: {
            original: originalImg,
            small: smallImg,
            medium: mediumImg,
          }
        };

        userModel.editUser(login, update, (err, user) => {
          if (err) next(err);
          res.status(200).send(user);
          callback(null, user);
        });
      }
    ],
    (err, user) => {
      if (err) next(err);
    }
  )
};

exports.deleteUserAvatar = function (req, res, next) {
  const userModel = req.app.db.models.User
  const userId = req.params.user_login
  const baseDir = path.join(__dirname, '../../../uploads/users/')
  const dirToDelete = `${baseDir}/${userId}/avatars`

  deleteFolderRecursive(dirToDelete);

  const update = {
    profileImg: {
      small: '/img/dummy/960-720.png',
      medium: '/img/dummy/960-720.png',
      original: 'public/img/dummy/960-720.png'
    }
  }

  userModel.editUser(userId, update, (err, user) => {
    if (err) next(err);
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

exports.getLoggedInUser = function (req, res, next) {
  // as of now, returned fields can be adjusted in userpassport.js
  const { User, Company, Team } = req.app.db.models
  User.findByLogin(req.user.login, (err, user) => {
    if(err){
      console.log(err);
      res.status(500).send();
      return false;
    }
    if(!user){
      res.json({});
      return false;
    }
    Company.find({ _id: { $in: user.companies } }, (err, companies) => {
      const userToReturn = Object.assign({}, user, { companies: companies })
      user.companies = companies
      Team.find({ _id: { $in: user.teams } }, (err, teams) => {
        user.teams = teams
        const userToReturn = JSON.parse(JSON.stringify(user))
        userToReturn.companyId = companies[0]._id
        userToReturn.companies = companies
        res.status(200).send(userToReturn)
      })
    });
  })
}
