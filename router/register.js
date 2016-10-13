'use strict'

const log = require('../helpers/logger');

module.exports = function(req, res, next) {
  const userModel = req.app.db.models.User;
  const user = new userModel(req.body);
  const sendLoginPasswordToEmail = require('./helpers/sendLoginPassword');
  user.joinedon = Date.now();
  req.body.username = req.body.login; //needed for passport JS middleware, change everywhere to login instead of username

  if (!user.login) {
      const logMsg = 'User login not specified';
      res.send({
          message: logMsg
      });
      return log(req, logMsg).err();
  }

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
                  sendLoginPasswordToEmail(credentials);
              };
              const logMsq = `User (login: ${user.login}) is saved to DB`;
              log(req, logMsq).info();
              next();
          });
      } else {
          const logMsq = `User (login: ${user.login}) is already in DB`;
          res.status(500).send();
          return log(req, logMsq).info()
      }
  });
}
