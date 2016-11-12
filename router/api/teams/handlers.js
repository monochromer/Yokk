'use strict';

const _ = require('lodash');
const sendEmail = require('../../helpers/sendEmail');
const path = require('path');
const valid = require("valid-email");

// CRUD API for teams

// POST
exports.create = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    const step = req.body.step;

    const email = req.body.email;
    if (!valid(email)) {
        var error = new Error();
        error.name = "Email is not valid";
        return next(error.name);
    }

    const code = req.body.code;
    const login = req.body.login;
    const name = req.body.name;

    switch (step) {
        case '0':
            createTeamWithGivenEmail(teamModel, email, sendEmail).then(team => {
                res.status(200).send(team);
            }).catch(reason => {
                res.status(500).send();
                next(reason);
            });
            break;

        case '1':
            checkConfirmationCode(code, email).then(team => {
                res.status(200).send(team);
            }).catch(reason => {
                res.status(500).send();
                next(reason);
            });
            break;

        case '2':
            saveTeamLeadLogin(login, email).then(team => {
                res.status(200).send(team);
            }).catch(reason => {
                res.status(500).send();
                next(reason);
            });
            break;

        case '4':
            saveTeamName(name, email).then(team => {
                res.status(200).send(team);
            }).catch(reason => {
                res.status(500).send();
                next(reason);
            });
            break;

        default:
            createTeamWithGivenEmail(teamModel, email, sendEmail).then(team => {
                res.status(200).send(team);
            }).catch(reason => {
                res.status(500).send();
                next(reason);
            });
            break;
    }

    function createTeamWithGivenEmail(teamDBModel, email, sendEmailFunc) {
        return new Promise((resolve, reject) => {
            if (!email) return reject(new Error());
            // TODO email validation
            const teamInitialData = {
                teamLeadEmail: email
            };
            teamDBModel.findOne(teamInitialData, (err, team) => {
                if(team && team.confirmed) {
                    let error = new Error();
                    error.name = "This team is already created and confirmed";
                    return next(error.name);
                }

                teamInitialData.confirmationCode = "111111";
                // teamInitialData.confirmationCode = Math.random().toString().slice(2, 8);

                const htmlToSend = `<div>Confirmation code ${teamInitialData.confirmationCode}</div>`;

                const mailOptions = {
                    from: '"Soshace team 👥" <bot@izst.ru>',
                    to: email,
                    subject: 'Your team is being processed. Please follow the instructions',
                    html: htmlToSend
                };

                if (!team) {
                    const newTeam = new teamDBModel(teamInitialData);
                    newTeam.save((err, team) => {
                        if (err) next(err);
                        resolve(team);
                        sendEmailFunc(mailOptions);
                    })
                } else {
                    resolve(team);
                    sendEmailFunc(mailOptions);
                }
            })
        })
    }

    function checkConfirmationCode(confirmationCode, email) {
        return new Promise((resolve, reject) => {
            teamModel.findOne({
                teamLeadEmail: email
            }, (err, team) => {
                if (err) return reject(err);
                if (!team) return reject(new Error());
                if (team.confirmationCode !== confirmationCode) return reject(new Error());
                if (team.confirmed === true) return reject(new Error());

                team.confirmed = true;
                team.save();

                resolve(team);
            })
        })
    }

    function saveTeamLeadLogin(login, teamLeadEmail) {
        return new Promise((resolve, reject) => {
            if (!login) reject('!login');
            teamModel.findOne({
                teamLeadEmail: teamLeadEmail
            }, (err, team) => {
                if (err) next(err);
                if (team === null) return reject(new Error());
                if (team.confirmed === false) return reject(new Error());
                if (team.teamLead) return reject(new Error());
                if (typeof login !== 'string' || login.length > 30) return reject(new Error());

                team.teamLead = login;
                team.save();
                resolve(team);
            })
        })
    }

    function saveTeamName(name, teamLeadEmail) {
        return new Promise((resolve, reject) => {
            teamModel.findOne({
                teamLeadEmail: email
            }, (err, team) => {
                if (err) next(err);
                if (team === null) return reject(new Error());
                if (team.name) return reject(new Error());
                if (typeof name !== 'string' || name.length > 30) return reject(new Error());

                team.name = name;
                team.save();
                resolve(team);
            })
        })
    }

};

exports.resendCode = function(req, res, next) {
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

            sendInvitations(emails.toInvite, teamName, teamId, sendEmail);

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
exports.delete = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    const teamName = req.params.teamName;

    if (!teamName) return res.status(500).send();

    teamModel.delete(teamName, (err, result) => {
        if (err) next(err);
        res.status(200).send(result);
    })
};

exports.deleteMeberFromTeam = function(req, res, next) {
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
