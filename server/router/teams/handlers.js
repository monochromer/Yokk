'use strict';

const _ = require('lodash');
const sendEmail = require('../helpers/sendEmail');
const path = require('path');
const valid = require("valid-email");

// CRUD API for teams

// POST
exports.create = function (req, res, next) {
  const { Team, User, Company } = req.app.db.models
  const { teamName } = req.params
  const { companyId } = req.body
  const { _id: originatorId } = req.user;


  const teamInitData = {
    name: teamName,
    teamOriginator: originatorId,
    created: Date()
  }

  const newTeam = new Team(teamInitData)

  createTeam(newTeam)
    .then(team => {
      res.status(200).send(team)
      // find user from request
      User.findOne({ _id: originatorId }, (err, user) => {
        const newTeamsArray = user.teams.concat([team._id])
        user.teams = newTeamsArray
        user.save()
      })
      // find company by @companyId
      Company.findOne({ _id: companyId }, (err, company) => {
        const newTeamsArray = company.teams.concat([team._id])
        company.teams = newTeamsArray
        company.save()
      })
    })

  function createTeam(newTeam) {
    return new Promise((resolve, reject) => {
      newTeam.save((err, team) => {
        if (err) next(err)
        resolve(team)
      })
    })
  }

};

exports.addTeamMembers = function (req, res, next) {
  const { unconfirmedUser, Team, User } = req.app.db.models
  const { teamId, companyId, membersEmails } = req.body
  // const { teamId, companyId, changeInProd } = req.body
  // const membersEmails = [changeInProd]

  let usersExist = []
  let usersToSave = []

  User.find( {teams: teamId}, (err,users) => {
    const userEmails = users.map(o => o.email)

    checkIfEmailInArray(userEmails)
    _.remove(membersEmails, o => usersExist.includes(o))

    unconfirmedUser.find( {teamId}, (err, unconfirmedUsers) => {
      const unconfirmedUsersEmails = unconfirmedUsers.map(o => o.email)

      checkIfEmailInArray(unconfirmedUsersEmails)
      _.remove(membersEmails, o => usersExist.includes(o))
      usersToSave = usersToSave.concat(membersEmails)

      saveUsersToDb(usersToSave)
      //
      // res.send({saved: usersToSave, exist: usersExist});
    })
  })

  function checkIfEmailInArray(arrayToFind) {
    membersEmails.forEach(email => {
      if (arrayToFind.includes(email)) usersExist.push(email)
    })
  }

  function saveUsersToDb(emailsList, existentUsers) {
    const sendBack = {}
    if (existentUsers && existentUsers.length !== 0) sendBack.exist = existentUsers

    Team.findOne({ _id: teamId }, (err, team) => {
      const allUsersAreSaved = []

      emailsList.forEach(email => {
        const unconfirmedUserInitData = {
          email: email,
          teamId: teamId
        }

        let newPromise = new Promise((resolve, reject) => {
          const newUnconfirmedUser = new unconfirmedUser(unconfirmedUserInitData)
          newUnconfirmedUser.save((err, user) => {
            // send token = user._id and when registering check the token
            // token should expire (DB should be cleaned) at some intervals
            const {DEFAULT_TEAM_NAME} = process.env
            const teamName = team.name ? team.name : DEFAULT_TEAM_NAME
            sendInvitation(teamName, teamId, sendEmail, email, companyId)


            resolve(user)
          })
        })

        allUsersAreSaved.push(newPromise)

      })

      Promise.all(allUsersAreSaved).then(savedMembers => {
        sendBack.saved = savedMembers
        res.status(200).send(sendBack)
      })
    })
  }

}

exports.resendCode = function (req, res, next) {
  const teamModel = req.app.db.models.Team;
  const teamId = req.query.teamId;

  teamModel.findOne({
    _id: teamId
  }, (err, team) => {
    team.confirmationCode = Math.random().toString().slice(2, 8);

    const htmlToSend = `<div>Confirmation code ${team.confirmationCode}</div>`;

    const mailOptions = {
      from: '"Soshace team 👥" <bot@izst.ru>',
      to: email,
      subject: 'Your team is being processed. Please follow the instructions',
      html: htmlToSend
    };

    sendEmail(mailOptions);

    team.save();
    res.status(200).send();
  })
}

// GET
exports.read = function (req, res, next) {
  const teamModel = req.app.db.models.Team;
  const teamName = req.params.teamName;

  // change name to _id as searchable field
  teamModel.read(teamName, (err, teamOrTeamsArray) => {
    if (err) next(err);
    if (teamOrTeamsArray) {
      return res.status(200).send(teamOrTeamsArray);
    }
    // no team found
    res.status(500).send();
  })

};

exports.getTeamsForCompany = function(req, res, next) {
  const { Team, Company, User, unconfirmedUser } = req.app.db.models
  const {companyId} = req.params
  // console.log('in getTeamsForCompany');
  // console.log(companyId);

  // Company.findOne({ _id: companyId }, (err, company) => {
  //   if (!company) return res.status(500).send() //company must exist
  //   console.log(company);
  //   res.send(company)
  //   // Team.find( { _id: { $in: company.teams } }, (err, teamsArray) => {
  //   //   const teamsToReturn = teamsArray.map(team => {
  //   //     const teamToReturn = {}
  //   //     teamToReturn.id = team._id
  //   //     teamToReturn.name = team.name
  //   //     User.find( {_id: {$in: team.members}}, (err, users) => {
  //   //       teamToReturn.members = users
  //   //       res.status(200).send(teamToReturn)
  //   //     })
  //   //
  //   //   })
  //   // })
  // })

  findCompanyBy(companyId)
  .then(company => {
    // console.log(company);
    return findTeamsBy(company.teams)
  })
  .then(teams => {
    // console.log(teams);
    // res.send(teams)
    return getUsers(teams)
  })
  .then(teamsWithUsers => {
    // console.log(teamsWithUsers);
    return getUnconfirmedUsers(teamsWithUsers)
  })
  .then(teams => {
    res.send(teams)
  })

  function findCompanyBy(companyId) {
    return new Promise((resolve,reject) => {
      Company.findOne({_id: companyId}, (err, company) => {
        resolve(company)
      })
    })
  }

  function findTeamsBy(teamsIds) {
    return new Promise((resolve, reject) => {
      Team.find({_id:{$in: teamsIds}}, (err, teamsArray) => {
        resolve(teamsArray)
      })
    })
  }

  function getUsers(teams) {
    return new Promise((resolve, reject) => {
      User.find({}, (err, users) => {
        teams.map(team => {
          team.members = team.members.map(id => {
            return _.find(users, o =>  `${o._id}` === `${id}`)
          })
          return team
        })
        resolve(teams)
      })
    })
  }

  function getUnconfirmedUsers(teams) {
    return new Promise((resolve, reject) => {
      unconfirmedUser.find({}, (err, users) => {
        teams.map(team => {
          team.members = team.members.concat(users.filter(user => `${user.teamId}` === `${team._id}`))
        })
        resolve(teams)
      })
    })
  }

}

// PUT
exports.update = function (req, res, next) {
  const teamModel = req.app.db.models.Team;
  const userModel = req.app.db.models.User;

  const addMembers = req.body.addMembers;
  const teamName = req.params.teamName;

  if (!teamName) return res.status(500).send();

  // const emailsToAdd = addMembers;

  teamModel.read(teamName, (err, team) => {
    if (err) next(err);
    if (!team) return res.status(500).send();

    const teamId = team._id;

    for (let key in req.body) {
      team[key] = req.body[key];
    }

    promiseFilteredEmails(addMembers).then(emails => {
      if (!emails) {
        team.save();
        return res.status(200).send();
      }

      const emailsToConfirm = emails.toInvite.map(email => {
        return {
          email: email,
          confirmed: false
        }
      });

      const {DEFAULT_TEAM_NAME} = process.env
      const teamName = team.name ? team.name : DEFAULT_TEAM_NAME
      sendInvitations(emails.toInvite, team.name, teamId, sendEmail);

      team.members = _.unionBy(team.members, emailsToConfirm, obj => obj.email);

      team.save();
      res.status(200).send();
    }).catch(reason => {
      // console.log(reason);
    });
  })

  function promiseFilteredEmails(emailsToFilter) {
    return new Promise((resolve, reject) => {
      if (!emailsToFilter || emailsToFilter === []) return resolve(false);

      userModel.find({}, {
        _id: 0,
        email: 1
      }, (err, users) => {
        const emailsInDB = users.map(member => {
          if (member.email) return member.email;
        });
        const toInvite = _.difference(emailsToFilter, emailsInDB);
        const toSkip = _.difference(emailsToFilter, toInvite);

        const members = {
          toInvite: toInvite,
          toSkip: toSkip
        }

        resolve(members);
      });
    })
  }

  function sendInvitations(emails, teamName, teamId, sendEmailFunc) {
    const {NODE_ENV, LINK_BASE_DEV, LINK_BASE_PROD} = process.env
    const linkBase = (NODE_ENV === 'development' ? LINK_BASE_DEV : LINK_BASE_PROD)
    emails.forEach(email => {
      const confirmationLink = `${linkBase}login?teamId=${teamId}&email=${email}&teamName=${teamName}`;

      const htmlToSend = `
                <div>You invited to be a part of team ${teamName}</div>
                <div>Confirm your participation by clicking <a href="${confirmationLink}">the link</a></div>`;

      const mailOptions = {
        from: '"Soshace team 👥" <bot@izst.ru>',
        to: email,
        subject: `Invitation to follow team ${teamName}`,
        html: htmlToSend
      };

      sendEmailFunc(mailOptions);
    })
  }

};

exports.changeName = function(req, res, next) {
  const {Team, Company} = req.app.db.models
  const {teamId, newName, companyId} = req.body

  Company.findOne({_id: companyId}, (err, company) => {
    if (err) next(err)

    Team.find({_id: {$in: company.teams}}, (err, teams) => {
      if (err) next(err)
      // const nameExist = teams.some(team => !newName && team._id !== teamId && team.name === newName)
      const nameExist = teams.some(team => {
        return newName && `${team._id}` !== `${teamId}` && team.name === newName
      })

      if (nameExist) return res.status(200).send({nameExist: true})

      Team.findOne({_id: teamId}, (err, team) => {
        team.name = newName
        team.save()
        res.status(200).send({newName: newName})
      })

    })
  })
}

// DELETE
exports.delete = function (req, res, next) {
  const {Team} = req.app.db.models
  const {teamName} = req.params

  Team.find({_id: teamName}).remove(() => {
    res.status(200).send()
  })
}

exports.deleteMeberFromTeam = function (req, res, next) {
  const teamModel = req.app.db.models.Team;

  const teamName = req.params.teamName;
  const email = req.params.email;

  teamModel.read(teamName, (err, team) => {
    if (err) next(err);
    if (!team) {
      res.status(500).send();
      return new Error();
    }

    team.members = _.filter(team.members, (o) => {
      return o.email !== email;
    });

    team.save();

    res.send(team);
  })
}

function sendInvitation(teamName, teamId, sendEmailFunc, email, companyId) {
  const {NODE_ENV, LINK_BASE_DEV, LINK_BASE_PROD} = process.env
  const linkBase = (NODE_ENV === 'development' ? LINK_BASE_DEV : LINK_BASE_PROD)

  const confirmationLink = `${linkBase}login?teamId=${teamId}&email=${email}&teamName=${teamName}&companyId=${companyId}`

  const htmlToSend = `
              <div>You invited to be a part of team ${teamName}</div>
              <div>Confirm your participation by clicking <a href="${confirmationLink}">the link</a></div>`;

  const mailOptions = {
    from: '"Soshace team 👥" <bot@izst.ru>',
    to: email,
    subject: `Invitation to follow team ${teamName}`,
    html: htmlToSend
  };

  sendEmailFunc(mailOptions);
}
