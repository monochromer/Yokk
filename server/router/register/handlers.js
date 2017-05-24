import jwt from 'jsonwebtoken';
import { NEW_USER_NOTIFICATION } from '../../constants';
const sendEmail = require('../helpers/sendEmail')
const valid = require("valid-email")

export const registerCompany = (req, res) => {
  const { User, Company, Team } = req.app.db.models
  const { email, step, code, firstName, lastName, password, companyName } = req.body;

  if (!email || !valid(email)) {
    res.status(400).send("Invalid e-mail");
    return false;
  }

  Company.findOne({originatorEmail: email}, (err, company) => {
    if(err){
      console.log(err);
      res.status(500).send("Server error");
      return false;
    }
    switch (step) {
      case '0':
        if (company && company.emailConfirmed) {
          res.status(409).send("This email address is already registered.");
          return false;
        }
        if (
          company &&
          company.codeSentDate &&
          Date.now() < (+company.codeSentDate + 1000 * 60 * 10) //+ 10 mins
        ) {
          res.status(409).send("This address is already in the system but is " +
            "not activated. Please activate it using link we sent you in the " +
            "confirmation letter");
          return false;
        }

        const { NODE_ENV, LINK_BASE_DEV, LINK_BASE_PROD } = process.env;
        const confCode = (NODE_ENV === 'development') ? '111111' :
          Math.random().toString().slice(2, 8);

        const linkBase = (NODE_ENV === 'development' ? LINK_BASE_DEV : LINK_BASE_PROD)
        const confirmationLink = `${linkBase}registration/step1?email=${email}&code=${confCode}`;

        const htmlToSend = "<div>Your e-mail was successfully registered in " +
          "system of Yokk!<br>To confirm it, enter the code below or use the " +
          "link.<br><br>Code: " + confCode + "<br>Confirmation link:<br>" +
          confirmationLink + "<br><br>" +
          "Thank you for registration!<br>Yokk! Team</div>";

        const mailOptions = {
          from: '"Soshace team 👥" <bot@izst.ru>',
          to: email,
          subject: 'Your company is being processed. Please follow the instructions',
          html: htmlToSend
        };

        if(!company){
          const newCompany = new Company({
            originatorEmail: email,
            confirmationCode: confCode,
            codeSentDate: Date.now(),
            codeTries: 0
          });
          newCompany.save((err, company) => {
            if(err){
              console.log(err);
              res.status(500).send("Server error");
              return false;
            }
            res.send();;
            sendEmail(mailOptions);
          })
        }
        else{
          company.confirmationCode = confCode;
          company.codeSentDate = Date.now();
          company.codeTries = 0;
          company.save((err, company) => {
            if(err){
              console.log(err);
              res.status(500).send("Server error");
              return false;
            }
            res.send();;
            sendEmail(mailOptions);
          });
        }
        break;

      case '1':
      case '5':
        if(!company){
          res.status(400).send("Company is not found");
          return false;
        }
        if(company.emailConfirmed === true){
          res.status(409).send("Company is already confirmed");
          return false;
        }
        if (
          company.codeSentDate &&
          +company.codeSentDate + 1000 * 60 * 10 < Date.now() //+ 10 mins
        ){
          res.status(409).send("The code expired");
          return false;
        }
        if(company.codeTries > 2){
          res.status(403).send("You entered an incorrect code 3 times");
          return false;
        }
        if(company.confirmationCode !== code){
          company.codeTries++;
          company.save((err, company) => {
            if(err){
              console.log(err);
              res.status(500).send("Server error");
              return false;
            }
            res.status(403).send("Invalid code");
          });
          return false;
        }
        if(step === '1'){
          res.send();
          break;
        }
        if(typeof companyName !== 'string'){
          res.status(400).send("Bad request");
          return false;
        }
        if(!companyName.length){
          res.status(406).send("Please enter Company Name");
          return false;
        }
        if(companyName.length > 100){
          res.status(406).send("Company Name must be 100 characters or less");
          return false;
        }

        User.findOne({email}, (err, dbUser) => {
          if(err){
            console.log(err);
            res.status(500).send('Server error');
            return false;
          }
          if (dbUser) {
            const logMsq = `User (email: ${email}) is already in DB`;
            res.status(400).send(logMsq);
            return false;
          }
          const newUserData = {
            email,
            password,
            joinedon: Date.now(),
            emailConfirmed: true,
            companies: [{
              companyId: company._id,
              role: 'owner',
              firstName,
              lastName
            }],
            currentCompany: company._id
          };
          const user = new User(newUserData);
          user.save((err, user) => {
            if(err){
              console.log(err);
              res.status(500).send('Server error');
              return false;
            }
            const newTeamData = {
              name: process.env.DEFAULT_TEAM_NAME,
              members: [{
                userId: user._id,
                manager: true
              }],
              companyId: company._id
            };
            const newTeam = new Team(newTeamData);
            newTeam.save((err, team) => {
              if(err){
                console.log(err);
                res.status(500).send('Server error');
                return false;
              }
              res.send({teamId: team._id, companyId: company._id});

              company.emailConfirmed = true;
              company.name = companyName;
              company.save();
            })
          });
        });

        break;

      default:
    }
  });

};

export const registerUser = (req, res) => {
  const { User, Team, unconfirmedUser, Notification } = req.app.db.models

  const { firstName, lastName, password, email, teamId, companyId } = req.body

  findUserByEmail(email)
    .then(() => {
      return checkInvite(email, teamId)
    })
    .then((role) => {
      const newUserData = {
        password,
        email,
        joinedon: Date.now(),
        emailConfirmed: true,
        companies: [{
          companyId,
          role,
          firstName,
          lastName
        }],
        currentCompany: companyId
      };
      return createNewUser(User, newUserData)
    })
    .then(user => {
      return saveUserToTeamMembers(teamId, user._id, Team)
    })
    .then((userId) => {
      return confirmInvite(email, teamId, unconfirmedUser, userId)
    })
    .then(userId => {
      const jwtToken = jwt.sign({
        _id: userId
      }, process.env.JWT_SECRET);
      res.json({jwtToken});
      User.find({
        companies: {$elemMatch: {companyId: companyId}},
        _id: {$ne: userId},
        notifications: NEW_USER_NOTIFICATION
      }, (err, users) => {
        if(err){
          console.log(err);
          return false;
        }
        if(!users){
          return false;
        }
        const userIds = [];
        const newNotifications = users.map((el) => {
          userIds.push("" + el._id);
          return {
            userId: el._id,
            text: "New user " + firstName + " " + lastName,
            targetType: "user",
            targetId: userId
          };
        });
        Notification.insertMany(newNotifications, (err) => {
          if(err){
            console.log(err);
            return false;
          }
          for(let ws in req.app.wsClients){
            if(userIds.indexOf(req.app.wsClients[ws].userId) !== -1){
              req.app.wsClients[ws].send('fetch_notifications');
              req.app.wsClients[ws].send('fetch_users');
            }
          }
        });
      });

    })
    .catch(reason => {
      console.log(reason);
      res.status(500).send(reason);
      return false;
    })

  function saveUserToTeamMembers(teamId, userId, teamModel) {
    return new Promise((resolve, reject) => {
      teamModel.findOne({ _id: teamId }, (err, team) => {
        if (err) return reject('Something went wrong while finding corresponding team')
        if (!team) return reject('The team should exist')
        team.members.push({userId})
        team.save((err, team) => {
          if (err) return reject('Something went wrong while saving user to team')
          resolve(userId)
        })
      })
    })
  }

  function confirmInvite(email, teamId, unconfirmedUserModel, userId) {
    return new Promise((resolve, reject) => {
      unconfirmedUserModel.find({ email, teamId }).remove((err, result) => {
        if (err) return reject('Something went wrong while confirming invite')
        resolve(userId)
      })
    })
  }

  function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) return reject('Some error occured while searching for user by email')
        if (user) return reject('User already in the system. If it\'s you, login and accept invite')
        resolve()
      })
    })
  }

  function checkInvite(email, teamId) {
    return new Promise((resolve, reject) => {
      unconfirmedUser.findOne({teamId, email}, (err, invite) => {
        if (err) return reject('Some error occured while searching for the team')
        if (!invite) return reject('Invite is not found')
        resolve(invite.role)
      })
    })
  }

  function createNewUser(userModel, initialData) {
    return new Promise((resolve, reject) => {
      const newUser = new userModel(initialData)
      newUser.save((err, user) => {
        if(err){
          console.log(err);
          return reject('Some error occured while saving user')
        }
        resolve(user)
      })
    })
  }

}
