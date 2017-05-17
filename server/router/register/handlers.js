import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  const { User, Team, unconfirmedUser, Notification } = req.app.db.models

  const { firstName, lastName, password, email, teamId, companyId } = req.body

  findUserByEmail(email)
    .then(() => {
      const newUser = new User({
        firstName,
        lastName,
        password,
        email,
        teams: [teamId],
        joinedon: Date.now(),
        companies: [companyId]
      })
      return createNewUser(User, newUser)
    })
    .then(user => {
      return saveUserToTeamMembers(teamId, user._id, Team)
    })
    .then((userId) => {
      return deleteUserEmailFromUnconfirmedEmails(email, unconfirmedUser, userId)
    })
    .then(userId => {
      const jwtToken = jwt.sign({
        _id: userId
      }, process.env.JWT_SECRET);
      res.json({jwtToken});

      User.find( {companies: companyId, _id: {$ne: userId}}, (err, users) => {
        if(err){
          console.log(err);
          return false;
        }
        const userIds = [];
        const newNotifications = users.map((el) => {
          userIds.push(el._id);
          return {
            userId: el._id,
            text: "New user " + firstName + " " + lastName,
            link: "/user/" + userId
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
        team.members.push(userId)
        team.save((err, team) => {
          if (err) return reject('Something went wrong while saving user to team')
          resolve(userId)
        })
      })
    })
  }

  function deleteUserEmailFromUnconfirmedEmails(email, unconfirmedUserModel, userId) {
    return new Promise((resolve, reject) => {
      unconfirmedUserModel.find({ email: email }).remove((err, result) => {
        if (err) return reject(err)
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
