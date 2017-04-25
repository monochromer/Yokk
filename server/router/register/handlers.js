import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    const userModel = req.app.db.models.User;
    const teamModel = req.app.db.models.Team;
    req.body.team = req.body.teamId;
    const user = new userModel(req.body);
    const teamId = req.body.teamId;

    const sendEmail = require('../helpers/sendEmail');
    user.joinedon = Date.now();
    req.body.username = req.body.login; //needed for passport JS middleware, change everywhere to login instead of username

    if (!user.login) {
        res.status(400).send('User login not specified');
        return false;
    }

    confirmEmail(teamId, req.body.email).then(team => {
        userModel.findByLogin(user.login, (err, dbUser) => {
            if (err) {
                console.log(err);
                res.status(500).send();
                return false;
            }
            if (!dbUser) {
                user.save((err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                        return false;
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
                            from: '"Soshace team рџ‘Ґ" <bot@izst.ru>', // sender address
                            to: credentials.email, // list of receivers
                            subject: 'Congratulations! You\'re now registered user', // Subject line
                            text: text,
                            html: htmlToSend // html body
                        };
                        sendEmail(mailOptions);
                    };
                    const jwtToken = jwt.sign({
                      _id: user._id,
                      login: user.login,
                      team: user.team,
                      role: user.role,
                      profileImg: user.profileImg
                    }, process.env.JWT_SECRET);
                    res.json({jwtToken});
                });
            } else {
                const logMsq = `Sorry! User (login: ${user.login}) is already in DB. Please, <a href='/api/user/register'>try again</a>`;
                res.status(409).send(logMsq);
            }
        });
    }).catch(reason => {
        console.log(reason);
        res.status(500).send();
    })

    function confirmEmail(teamId, email) {
        return new Promise((resolve, reject) => {
            teamModel.findOne({
                _id: teamId
            }, (err, team) => {
                if (err) next(err);

                if (!team) return reject(new Error());

                let emailNotPresent = true;
                const mappedEmails = team.members.map(emailObject => {
                    if (emailObject.email === email && !emailObject.confirmed) {
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

}