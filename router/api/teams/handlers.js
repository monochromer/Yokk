'use strict';

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
        res.send('No team found');
    })

};

// PUT
exports.update = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    if (req.params.name) {
        teamModel.update(req.params.name, req.body, (err, team) => {
            if (err) next(err);
            if (!team) return res.send('No team with given name found');
            res.status(200).send(team);
        })
    } else {
        res.send('No team specified');
    }
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
        res.send('No team specified');
    }
};