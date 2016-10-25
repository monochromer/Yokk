'use strict';

const _ = require('lodash');

// CRUD API for teams

// POST
exports.create = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    let teamData = {
        name: req.params.name,
    };
    // // in body can be:
    // // @teamLead
    // // @teamLogo
    if (!req.params.name) {
        return res.send('No team name specified');
    }

    teamModel.create(req.params.name, (err, team) => {
        if (err) next(err);

        if (!team) {
            const newTeam = new teamModel(teamData);
            newTeam.save((err, team) => {
                if (err) next(err);
                res.status(200).send(team);
            })

        } else {
            res.send('Specified team already exists');
        }
    })
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



    teamModel.read(req.params.name, (err, team) => {
        if (err) next(err);

        if (req.body.addMembers) {
            req.body.addMembers = req.body.addMembers.split(',');

            // Should add a team to each user!!
            // req.body.addMembers.forEach((login) => {
            //     userModel.findByLogin(login, (err, user) => {
            //         if (err) next(err);
            //         console.log(user.login);
            //     })
            // })

            team.members = _.union(team.members, req.body.addMembers);
        }

        if (req.body.deleteMembers) {
            req.body.deleteMembers = req.body.deleteMembers.split(',');
            team.members = _.difference(team.members, req.body.deleteMembers);
        }

        for (let key in req.body) {
            if (key === 'members') {
                team[key] = req.body[key].split(',');
            } else {
                team[key] = req.body[key];
            }
        }

        team.save();
        res.status(200).send(team);
    })
};

// DELETE
exports.delete = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    if (req.params.name) {
        teamModel.delete(req.params.name, (err, result) => {
            if (err) next(err);
            res.status(200).send(result);
        })
    } else {
        // No team specified
        res.status(500).send();
    }
};
