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
            createTeamWithGivenEmail(email);
            break

        case '1':
            checkConfirmationCode(code);
            break

        case '2':
            saveTeamLeadLogin(login);
            break

        case '4':
            saveTeamName(name);
            break

        default:
            createTeamWithGivenEmail(email);
            break
    }

    // const teamInitialData = {
    //     teamLeadEmail: email
    // };

    function createTeamWithGivenEmail(email) {
        if (!email) return res.status(500).send('No email specified');
        // TODO email validation
        const teamInitialData = {
            teamLeadEmail: email
        }
        teamModel.findOne(teamInitialData, (err, team) => {
            if (!team) {
                teamInitialData.confirmationCode = Math.floor(Math.random() * 1000000);
                const newTeam = new teamModel(teamInitialData);
                newTeam.save((err, team) => {
                    if (err) next(err);
                    res.status(200).send(team);


                    const htmlToSend =
                        `<div>Confirmation code ${teamInitialData.confirmationCode}</div>`;

                    const mailOptions = {
                        from: '"Soshace team 👥" <bot@soshace.com>',
                        to: email,
                        subject: 'Your team is being processed. Please follow the instructions', // Subject line
                        html: htmlToSend
                    };

                    sendEmail(mailOptions);
                })
            } else(
                res.status(500).send('Team with given email already exists')
            )

        })
    }

    function checkConfirmationCode(confirmationCode) {
        teamModel.findOne({
            teamLeadEmail: email
        }, (err, team) => {
            if (err) next(err);
            if (team.confirmed === true) return res.status(500).send('Code already confirmed');
            if (team === null) return res.send('No team found');
            if (team.confirmationCode === confirmationCode) {
                team.confirmed = true;
                team.save();
                res.status(200).send('Code confirmed');
            } else {
                res.status(500).send('Code is wrong')
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
            res.send('Team leader\'s login saved');
        })
    }

    function saveTeamName(name) {
        teamModel.findOne({
            teamLeadEmail: email
        }, (err, team) => {
            if (err) next(err);
            if (team === null) return res.send('No team found');
            team.name = name;
            team.save();
            res.send('Team name is saved');
        })
    }

};

// GET
exports.read = function(req, res, next) {
    const teamModel = req.app.db.models.Team;

    // change name to _id as searchable field
    teamModel.read(req.params.name, (err, teamOrTeamsArray) => {
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
    const teamName = req.params.teamName;

    function getEmailsArray(emailsString) {
        if (emailsString) return emailsString.split(',');
    }
    const emailsToAdd = getEmailsArray(req.body.addMembers)

    if (req.query.confirm) {
        res.send(req.query.confirm + ' confirmed');
    }

    promiseFilteredEmails(emailsToAdd).then(emails => {
        const emailsToConfirm = emails.toInvite.map(email => {
            return {
                email: email,
                confirmed: false
            }
        });
        sendInvitations(emails.toInvite, teamName);
        addMembersToTeam(teamName, emailsToConfirm);
        // res.status(200).send(emails.toInvite);
    });



    function addMembersToTeam(teamName, members) {
        teamModel.read(teamName, (err, team) => {
            if (err) next(err);
            if (!team) return res.status(500).send('No team found');
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

    function sendInvitations(emails, teamName) {
        emails.forEach(email => {
            const confirmationLink = `http://eop.soshace.com/api/teams/${teamName}?confirm=${email}`;

            const htmlToSend = `
                <div>You invited to be a part of team ${teamName}</div>
                <div>Confirm your participation by clicking <a href="${confirmationLink}">the link</a></div>`;

            const mailOptions = {
                from: '"Soshace team 👥" <bot@soshace.com>',
                to: email,
                subject: `Invitation to follow team ${teamName}`,
                html: htmlToSend
            };

            console.log(mailOptions);

            sendEmail(mailOptions);
        })
    }

    // teamModel.read(req.params.name, (err, team) => {
    //     if (err) next(err);
    //
    //     if (req.body.addMembers) {
    //         req.body.addMembers = req.body.addMembers.split(',');
    //
    //         // Should add a team to each user!!
    //         // req.body.addMembers.forEach((login) => {
    //         //     userModel.findByLogin(login, (err, user) => {
    //         //         if (err) next(err);
    //         //         console.log(user.login);
    //         //     })
    //         // })
    //
    //         team.members = _.union(team.members, req.body.addMembers);
    //     }
    //
    //     if (req.body.deleteMembers) {
    //         req.body.deleteMembers = req.body.deleteMembers.split(',');
    //         team.members = _.difference(team.members, req.body.deleteMembers);
    //     }
    //
    //     for (let key in req.body) {
    //         if (key === 'members') {
    //             team[key] = req.body[key].split(',');
    //         } else {
    //             team[key] = req.body[key];
    //         }
    //     }
    //
    //     team.save();
    //     res.status(200).send(team);
    // })
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
