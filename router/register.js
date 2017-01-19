'use strict'

const log = require('../helpers/logger')
const sendEmail = require('./helpers/sendEmail')

module.exports = function (req, res, next) {
  const { User, Team, unconfirmedUser } = req.app.db.models

  const { login, password, email, teamId, companyId } = req.body

  findUserByEmail(email)
    .then(() => {
      const newUser = new User({
        login: login,
        password: password,
        email: email,
        teams: [teamId],
        joinedon: Date.now(),
        companies: [companyId]
      })
      return createNewUser(User, newUser)
    })
    .then(user => {
      return saveUserToTeamMembers(teamId, user._id, Team)
    })
    .then(() => {
      return deleteUserEmailFromUnconfirmedEmails(email, unconfirmedUser)
    })
    .then(result => {
      res.status(200).send()
    })
    .catch(reason => {
      next(reason)
    })

  function saveUserToTeamMembers(teamId, userId, teamModel) {
    return new Promise((resolve, reject) => {
      teamModel.findOne({ _id: teamId }, (err, team) => {
        if (err) return reject('Something went wrong while finding corresponding team')
        if (!team) return reject('The team should exist')
        team.members.push(userId)
        team.save((err, team) => {
          if (err) return reject('Something went wrong while saving user to team')
          resolve()
        })
      })
    })
  }

  function deleteUserEmailFromUnconfirmedEmails(email, unconfirmedUserModel) {
    return new Promise((resolve, reject) => {
      unconfirmedUserModel.find({ email: email }).remove((err, result) => {
        if (err) return reject(err)
        resolve('User succesfully created, added to team and email removed from unconfirmed')
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

  function createNewUser(userModel, initialData) {
    return new Promise((resolve, reject) => {
      const newUser = new userModel(initialData)
      newUser.save((err, user) => {
        if (err) return reject('Some error occured while saving user')
        resolve(user)
      })
    })
  }

}
