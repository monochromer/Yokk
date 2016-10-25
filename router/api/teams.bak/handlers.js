'use strict';

// CRUD API for teams

// POST
exports.create = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    let teamData = {
        name: req.params.name,
    };
    // in body can be:
    // @teamLead
    // @teamLogo
    if (!teamData.name) {
        return res.send('No team name specified');
    }
    teamModel.findOne({
        name: teamData.name
    }, (err, team) => {
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
    if (req.params.name) {
        teamModel.findOne({
            name: req.params.name
        }, (err, team) => {
            if (err) next(err);
            if (team) {
                return res.status(200).send(team);
            }
            res.send('No team foudn');
        })
    } else {
        teamModel.find({}, (err, teamsArray) => {
            if (err) next(err);
            res.send(teamsArray);
        })
    }
};

// PUT
exports.update = function(req, res, next) {
    const teamModel = req.app.db.models.Team;
    if (req.params.name) {
        // res.send(`Update algorithm for ${req.params.name}`)
        // res.send(req.body);
        teamModel.findOneAndUpdate({
            name: req.params.name
        }, req.body, {
            new: true
        }, (err, team) => {
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
        teamModel.remove({name: req.params.name}, (err, result) => {
          if (err) next(err);
          res.status(200).send(result);
        })
    } else {
        res.send('No team specified');
    }
};
