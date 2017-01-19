'use strict';

const _ = require('lodash');
const sendEmail = require('../../helpers/sendEmail');
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
    created: Date.now()
  }

  const newTeam = new Team(teamInitData)

  createTeam(newTeam)
    .then(team => {
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
  const { unconfirmedUser, Team } = req.app.db.models
  const { teamId, companyId, membersEmails } = req.body

  Team.findOne({ _id: teamId }, (err, team) => {
    membersEmails.forEach(email => {
      const unconfirmedUserInitData = {
        email: email,
        teamId: teamId
      }
      const newUnconfirmedUser = new unconfirmedUser(unconfirmedUserInitData)
      newUnconfirmedUser.save(user => {
        // send token = user._id and when registering check the token
        // token should expire (DB should be cleaned) at some intervals
        sendInvitation(team.name, teamId, sendEmail, email, companyId)
        res.status(200).send()
      })
    })
  })

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
    emails.forEach(email => {
      const confirmationLink = `http://eop.soshace.com/login?teamId=${teamId}&email=${email}&teamName=${teamName}`;

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

// DELETE
exports.delete = function (req, res, next) {
  const teamModel = req.app.db.models.Team;
  const teamName = req.params.teamName;

  if (!teamName) return res.status(500).send();

  teamModel.delete(teamName, (err, result) => {
    if (err) next(err);
    res.status(200).send(result);
  })
};

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
  let confirmationLinkBase = 'eop.soshace.com'
  if (process.env.NODE_ENV == 'development') {
    confirmationLinkBase = 'localhost:5000'
  }
  const confirmationLink = `http://${confirmationLinkBase}/login?teamId=${teamId}&email=${email}&teamName=${teamName}&companyId=${companyId}`

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
