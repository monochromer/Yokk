'use strict';

const _ = require('lodash');
const sendEmail = require('../../helpers/sendEmail');

// CRUD API for teams

// POST
exports.create = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    const step = req.body.step;
    const email = req.body.email;
    const code = req.body.code;
    const login = req.body.login;
    const name = req.body.name;

    switch (step) {
        case '0':
            createTeamWithGivenEmail(teamModel, email, sendEmail).then(team => {
                if (team) {
                    return res.status(200).send(team);
                }
                res.status(500).send('Team with given email already exists'); //team already exists
            });
            break

        case '1':
            checkConfirmationCode(code, email);
            break

        case '2':
            saveTeamLeadLogin(login);
            break

        case '4':
            saveTeamName(name, email);
            break

        default:
            createTeamWithGivenEmail(email);
            break
    }

    function createTeamWithGivenEmail(teamDBModel, email, sendEmailFunc) {
        if (!email) return res.status(500).send('No email specified');
        // TODO email validation
        const teamInitialData = {
            teamLeadEmail: email
        };
        return new Promise((resolve, reject) => {
            teamDBModel.findOne(teamInitialData, (err, team) => {
                if (!team) {
                    // teamInitialData.confirmationCode = Math.random().toString().slice(2, 8);
                    teamInitialData.confirmationCode = '111111'; //for debug purposes
                    const newTeam = new teamDBModel(teamInitialData);
                    newTeam.save((err, team) => {
                        if (err) next(err);

                        const htmlToSend = `<div>Confirmation code ${teamInitialData.confirmationCode}</div>`;

                        const mailOptions = {
                            from: '"Soshace team 👥" <bot@izst.ru>',
                            to: email,
                            subject: 'Your team is being processed. Please follow the instructions',
                            html: htmlToSend
                        };

                        sendEmailFunc(mailOptions);

                        resolve(team);
                    })
                } else {
                    resolve(false);
                }
            })
        })
    }

    function checkConfirmationCode(confirmationCode, email) {
        teamModel.findOne({
            teamLeadEmail: email
        }, (err, team) => {
            if (err) next(err);
            if (!team) return res.status(500).send('No team found');
            if (team.confirmed === true) return res.status(500).send('Code already confirmed');
            if (team.confirmationCode === confirmationCode) {
                team.confirmed = true;
                team.save();
                res.status(200).send(team);
            } else {
                res.status(500).send(false);
            }
        })
    }

    function saveTeamLeadLogin(login) {
        if (!login) return res.status(500).send();
        teamModel.findOne({
            teamLeadEmail: email
        }, (err, team) => {
            if (err) next(err);
            if (team === null) return res.status(500).send('No team found');
            if (team.confirmed === false) return res.status(500).send('Email is not confirmed');
            team.teamLead = login;
            team.save();
            res.status(200).send(team);
        })
    }

    function saveTeamName(name, teamLeadEmail) {
        teamModel.findOne({
            teamLeadEmail: email
        }, (err, team) => {
            if (err) next(err);
            if (team === null) return res.status(500).send('No team found');
            team.name = name;
            team.save();
            res.status(200).send(team);
        })
    }

};

// GET
exports.read = function(req, res, next) {
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
exports.update = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    const userModel = req.app.db.models.User;
    const addMembers = req.body.addMembers;
    console.log(addMembers[0]);
    const teamName = req.params.teamName;

    if (!teamName) return res.status(500).send();

    const emailsToAdd = addMembers;

    teamModel.read(teamName, (err, team) => {
        if (err) next(err);
        if (!team) return res.status(500).send('No team found')

        const teamId = team._id;

        for (let key in req.body) {
            team[key] = req.body[key];
        }

        if (addMembers) {
            promiseFilteredEmails(emailsToAdd).then(emails => {
                const emailsToConfirm = emails.toInvite.map(email => {
                    return {
                        email: email,
                        confirmed: false
                    }
                });
                sendInvitations(emails.toInvite, teamName, teamId);
                addMembersToTeam(teamName, emailsToConfirm);
            });
        }

        team.save();
        res.status(200).send(team);
    })


    function addMembersToTeam(teamName, members) {
        teamModel.read(teamName, (err, team) => {
            if (err) next(err);
            if (!team) return res.status(500).send('No team found'); //this can cause server crash (Can't set headers after they are sent.)
            const matcher = obj => obj.email;
            team.members = _.unionBy(team.members, members, matcher);
            team.save();
        })
    }

    function promiseFilteredEmails(emailsToFilter) {
        return new Promise((resolve, reject) => {
            userModel.find({}, {
                _id: 0,
                email: 1
            }, (err, users) => {
                const emailsInDB = users.map((member) => {
                    if (member.email) return member.email;
                });
                const toInvite = _.difference(emailsToAdd, emailsInDB);
                const toSkip = _.difference(emailsToAdd, toInvite);

                const members = {
                    toInvite: toInvite,
                    toSkip: toSkip
                }

                resolve(members);
            });
        })
    }

    function sendInvitations(emails, teamName, teamId) {
        emails.forEach(email => {
            const confirmationLink = `http://eop.soshace.com/login?teamId=${teamId}&email=${email}&teamName=${teamName}`;

            const htmlToSend = `
                <div>You invited to be a part of team ${teamName}</div>
                <div>Confirm your participation by clicking <a href="${confirmationLink}">the link</a></div>`;

            const mailOptions = {
                from: '"Soshace team 👥" <bot@soshace.com>',
                to: email,
                subject: `Invitation to follow team ${teamName}`,
                html: htmlToSend
            };

            sendEmail(mailOptions);
        })
    }

};

// DELETE
exports.delete = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    if (req.params.teamName) {
        teamModel.delete(req.params.teamName, (err, result) => {
            if (err) next(err);
            res.status(200).send(result);
        })
    } else {
        res.status(500).send();
    }
};

exports.confirmEmail = function(req, res, next) {
    const teamModel = req.app.db.models.Team;

    const teamName = req.params.teamName;
    const email = req.params.email;

    teamModel.read(teamName, (err, team) => {
        if (err) next(err);
        if (!team) return res.status(500).send('No team found');

        const mappedEmails = team.members.map((emailObject) => {
            if (emailObject.email === email) emailObject.confirmed = true;
            return emailObject;
        });

        team.members = [];
        team.save();
        team.members = mappedEmails; //doesn't work without clearning team.members first
        team.save();

        res.status(200).send(team);
    })
}

exports.deleteMeberFromTeam = function(req, res, next) {
    const teamModel = req.app.db.models.Team;

    const teamName = req.params.teamName;
    const email = req.params.email;

    teamModel.read(teamName, (err, team) => {
        if (err) next(err);
        if (!team) return res.status(500).send('No team found');

        team.members = _.filter(team.members, (o) => {
            return o.email !== email;
        });

        team.save();

        res.send(team);
    })
}
