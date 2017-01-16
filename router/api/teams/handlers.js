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
  const { User, Team } = req.app.db.models
  const { teamId, membersEmails } = req.body

  Team.findOne({ _id: teamId }, (err, team) => {
    membersEmails.forEach(email => {
      team.members.push({
        type: 'email',
        value: email
      })
      team.save()

      sendInvitation(team.name, teamId, sendEmail, email);
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
      console.log(reason);
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

function sendInvitation(teamName, teamId, sendEmailFunc, email) {
  let confirmationLinkBase = 'eop.soshace.com'
  if (process.env.NODE_ENV == 'development') {
    confirmationLinkBase = 'localhost:5000'
    console.log(confirmationLinkBase);
  }
  const confirmationLink = `http://${confirmationLinkBase}/login?teamId=${teamId}&email=${email}&teamName=${teamName}`
  console.log(confirmationLink);

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
