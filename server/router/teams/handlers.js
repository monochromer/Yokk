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
    created: Date.now(),
    members: [{_id: originatorId, manager: true}],
    companyId
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

exports.addTeamMembers = function (req, res) {
  const { UnconfirmedUser, User, Team, Notification, Company } = req.app.db.models
  const { invites, teamId } = req.body

  if(
    !invites
  ){
    res.status(400).send('Bad request');
    return false;
  }
  const companyId = "" + req.user.currentCompany;
  const profile = req.user.companies.find(
    el => "" + el.companyId === companyId
  );
  const userName = profile.firestName + " " + profile.lastName;
  Company.findOne({_id: companyId}, (err, company) => {
    sendInvites(
      invites,
      teamId,
      companyId,
      User,
      UnconfirmedUser,
      Team,
      Notification,
      userName,
      company.name
    ).then((invites) => {
      res.send(invites);
    }, (err) => {
      console.log(err);
      res.status(500).send('Server error');
    });
  });
}

export function sendInvites(
  invites,
  teamId,
  companyId,
  User,
  UnconfirmedUser,
  Team,
  Notification,
  userName,
  companyName
) {
  return new Promise((resolve, reject) => {
    _.remove(invites, el => !valid(el.email))
    const invitedEmails = invites.map(el => el.email);

    User.find( {email: {$in: invitedEmails}}, (err, users) => {
      if(err){
        reject(err);
        return false;
      }
      users.forEach((user) => {
        const { role, manager } = invites.find(el => el.email === user.email);
        _.remove(invites, el => el.email === user.email);
        if(!user.companies.find(el => "" + el.companyId === "" + companyId)){
          const newProfile = Object.assign({}, user.toObject().companies[0]);
          newProfile.companyId = companyId;
          newProfile.role = role;
          user.companies.push(newProfile);
          user.save();
        }
        if(!teamId) return;
        Team.findOne({_id: teamId}, (err, team) => {
          if(!team.members.find(el => "" + el.userId === "" + user._id)){
            team.members.push({userId: user._id, manager});
            team.save();
            Notification.insert({
              userId: user._id,
              companyId,
              text: "Invitation to team " + team.name,
              targetType: "team",
              targetId: team._id
            }, (err) => {
              if(err) console.log(err);
              for(let ws in req.app.wsClients){
                if(req.app.wsClients[ws].userId === "" + user._id){
                  req.app.wsClients[ws].send('fetch_notifications');
                  req.app.wsClients[ws].send('fetch_teams');
                }
              }
            });
          }
        });
      });
      const newInvites = invites.map((el) => {
        return({
          teamId,
          companyId,
          email: el.email,
          role: el.role
        });
      });
      UnconfirmedUser.insertMany(newInvites, {
        continueOnError: true, safe: true
      }, (err, results) => {
        if(err && err.code != "11000"){
          reject(err);
          return false;
        }
        invites.forEach(el => {
          sendInvitation(userName, companyName, teamId, el.email, companyId)
        })
        resolve(results);
      });
    })
  });
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
exports.read = function (req, res) {
  const Team = req.app.db.models.Team;
  const { user } = req;
  const { role } = user.companies.find(
    el => "" + el.companyId === "" + user.currentCompany
  );
  Team.find({
    companyId: user.currentCompany,
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
      Team.find({
        companyId: user.currentCompany
      }, (err, teams) => {
        if(err){
          console.log(err);
          res.status(500).send('Server error');
          return false;
        }
        res.json(teams);
      });
    }
    else{
      Team.find({
        companyId: user.currentCompany,
        members: {$elemMatch: {userId: user._id}}
      }, (err, teams) => {
        if(err){
          console.log(err);
          res.status(500).send('Server error');
          return false;
        }
        res.json(teams);
      });
    }
  });

};

exports.getTeamsForCompany = function(req, res, next) {
  const { Team, Company, User, UnconfirmedUser } = req.app.db.models
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
      UnconfirmedUser.find({}, (err, users) => {
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
      sendInvitations(emails.toInvite, team.name, teamId);

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

  function sendInvitations(emails, teamName, teamId) {
    const { NODE_ENV, LINK_BASE_DEV, LINK_BASE_PROD } = process.env
    const linkBase = (NODE_ENV === 'development' ? LINK_BASE_DEV : LINK_BASE_PROD)
    emails.forEach(email => {
      const confirmationLink = `${linkBase}register?teamId=${teamId}&email=${email}`;

      const htmlToSend = `
                <div>You invited to be a part of team ${teamName}</div>
                <div>Confirm your participation by clicking <a href="${confirmationLink}">the link</a></div>`;

      const mailOptions = {
        from: '"Soshace team 👥" <bot@izst.ru>',
        to: email,
        subject: `Invitation to follow team ${teamName}`,
        html: htmlToSend
      };

      sendEmail(mailOptions);
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

function sendInvitation(userName, companyName, teamId, email, companyId) {
  const { NODE_ENV, LINK_BASE_DEV, LINK_BASE_PROD } = process.env
  const linkBase = (NODE_ENV === 'development' ? LINK_BASE_DEV : LINK_BASE_PROD)

  const confirmationLink = `${linkBase}register?email=${email}&companyId=${companyId}` +
  (teamId ? `&teamId=${teamId}` : '');

  const htmlToSend = `<div>You were invited by ${userName} to join ${companyName} on Yokk!.<br>
                        To register, use this link:<br>
                        ${confirmationLink}
                        <br><br>
                        Best regards,<br>
                        Yokk! team</div>`;

  const mailOptions = {
    from: '"Yokk! team" <yokk@soshace.com>',
    to: email,
    subject: `Invitation to ${companyName}`,
    html: htmlToSend
  };

  sendEmail(mailOptions);
}
