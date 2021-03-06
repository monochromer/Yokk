'use strict'

const log = require('../helpers/logger');

module.exports = function(req, res, next) {
    const userModel = req.app.db.models.User;
    const teamModel = req.app.db.models.Team;
    req.body.team = req.body.teamId;
    const user = new userModel(req.body);
    const teamId = req.body.teamId;

    const sendEmail = require('./helpers/sendEmail');
    user.joinedon = Date.now();
    req.body.username = req.body.login; //needed for passport JS middleware, change everywhere to login instead of username

    if (!user.login) {
        const logMsg = 'User login not specified';
        res.send({
            message: logMsg
        });
        return log(req, logMsg).err();
    }

    function confirmEmail(teamId, email) {
        return new Promise((resolve, reject) => {
            teamModel.findOne({
                _id: teamId
            }, (err, team) => {
                if (err) next(err);

                if (!team) return reject(new Error());

                let emailNotPresent = true;
                const mappedEmails = team.members.map(emailObject => {
                    if (emailObject.email === req.body.email && !emailObject.confirmed) {
                        emailNotPresent = false;
                        emailObject.confirmed = true;
                    };
                    return emailObject;
                });

                if (emailNotPresent) return reject(new Error());

                team.members = [];
                team.save();
                team.members = mappedEmails; //doesn't work without clearning team.members first
                team.save();

                resolve(team);
            })
        })
    }

    confirmEmail(teamId).then(team => {
        userModel.findByLogin(user.login, (err, dbUser) => {
            if (err) {
                res.status(500).send();
                return log(req, err).err();
            }
            if (!dbUser) {
                user.save((err, user) => {
                    if (err) {
                        log(req, err).err();
                        return res.status(500).send();
                    };
                    if (typeof req.body.email !== 'undefined') {
                        let credentials = {
                            login: req.body.login,
                            password: req.body.password,
                            email: req.body.email
                        };
                        let text;
                        let htmlToSend =
                            `<div>Login: <b>${credentials.login}</b></div>
                    <div>Password: <b>${credentials.password}</b></div>
                    <div><a href='http://eop.soshace.com/'>eop.soshace.com</a></div>`;

                        let mailOptions = {
                            from: '"Soshace team 👥" <bot@izst.ru>', // sender address
                            to: credentials.email, // list of receivers
                            subject: 'Congratulations! You\'re now registered user', // Subject line
                            text: text,
                            html: htmlToSend // html body
                        };
                        sendEmail(mailOptions);
                    };
                    const logMsq = `User (login: ${user.login}) is saved to DB`;
                    log(req, logMsq).info();
                    next();
                });
            } else {
                const logMsq = `Sorry! User (login: ${user.login}) is already in DB. Please, <a href='/api/user/register'>try again</a>`;
                log(req, logMsq).info();
                res.status(200).send(logMsq);
            }
        });
    }).catch(reason => {
        res.status(500).send();
        next(reason);
    })

}
