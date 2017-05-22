import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import { NEW_USER_NOTIFICATION } from '../../constants';

export const register = (req, res) => {
  const { User, Team, unconfirmedUser, Notification } = req.app.db.models

  const { firstName, lastName, password, email, teamId, companyId } = req.body

  findUserByEmail(email)
    .then(() => {
      return checkInvite(email, teamId)
    })
    .then((role) => {
      const newUserData = {
        password,
        email,
        joinedon: Date.now(),
        emailConfirmed: true,
        companies: [{
          companyId,
          role,
          firstName,
          lastName
        }],
        currentCompany: companyId
      };
      return createNewUser(User, newUserData)
    })
    .then(user => {
      return saveUserToTeamMembers(teamId, user._id, Team)
    })
    .then((userId) => {
      return confirmInvite(email, teamId, unconfirmedUser, userId)
    })
    .then(userId => {
      const jwtToken = jwt.sign({
        _id: userId
      }, process.env.JWT_SECRET);
      res.json({jwtToken});
      User.find({
        companies: {$elemMatch: {companyId: companyId}},
        _id: {$ne: userId},
        notifications: NEW_USER_NOTIFICATION
      }, (err, users) => {
        if(err){
          console.log(err);
          return false;
        }
        if(!users){
          return false;
        }
        const userIds = [];
        const newNotifications = users.map((el) => {
          userIds.push("" + el._id);
          return {
            userId: el._id,
            text: "New user " + firstName + " " + lastName,
            targetType: "user",
            targetId: userId
          };
        });
        Notification.insertMany(newNotifications, (err) => {
          if(err){
            console.log(err);
            return false;
          }
          for(let ws in req.app.wsClients){
            if(userIds.indexOf(req.app.wsClients[ws].userId) !== -1){
              req.app.wsClients[ws].send('fetch_notifications');
              req.app.wsClients[ws].send('fetch_user');
            }
          }
        });
      });

    })
    .catch(reason => {
      console.log(reason);
      res.status(500).send(reason);
      return false;
    })

  function saveUserToTeamMembers(teamId, userId, teamModel) {
    return new Promise((resolve, reject) => {
      teamModel.findOne({ _id: teamId }, (err, team) => {
        if (err) return reject('Something went wrong while finding corresponding team')
        if (!team) return reject('The team should exist')
        team.members.push({userId})
        team.save((err, team) => {
          if (err) return reject('Something went wrong while saving user to team')
          resolve(userId)
        })
      })
    })
  }

  function confirmInvite(email, teamId, unconfirmedUserModel, userId) {
    return new Promise((resolve, reject) => {
      unconfirmedUserModel.find({ email, teamId }).remove((err, result) => {
        if (err) return reject('Something went wrong while confirming invite')
        resolve(userId)
      })
    })
  }

  function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) return reject('Some error occured while searching for user by email')
        if (user) return reject('User already in the system. If it\'s you, login and accept invite')
        resolve()
      })
    })
  }

  function checkInvite(email, teamId) {
    return new Promise((resolve, reject) => {
      unconfirmedUser.findOne({teamId, email}, (err, invite) => {
        if (err) return reject('Some error occured while searching for the team')
        if (!invite) return reject('Invite is not found')
        resolve(invite.role)
      })
    })
  }

  function createNewUser(userModel, initialData) {
    return new Promise((resolve, reject) => {
      const newUser = new userModel(initialData)
      newUser.save((err, user) => {
        if(err){
          console.log(err);
          return reject('Some error occured while saving user')
        }
        resolve(user)
      })
    })
  }

}
