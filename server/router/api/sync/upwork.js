const moment = require('moment');
const upworkTestData = require('./upworkTestData');
const UpworkApi = require('upwork-api');
const Auth = require('upwork-api/lib/routers/auth').Auth;

module.exports = function(req, res, next) {
  const userModel = req.app.db.models.User;
  const userId = req.user._id;

  promiseUpworkCredentials(userModel, userId)
  .then(credentials => {
    //upwork API connection and retreiving data
    const config = Object.assign({}, credentials);
    const api = new UpworkApi(config);
    // api.setAccessToken(config.accessToken, config.accessSecret, function() {
    //   //do something
    // });

    //test data is returned for now
    //imitating Upwork API request lag
    setTimeout(() => {
      res.status(200).send(upworkTestData);
    }, 1000)
  })
  .catch(error => {
    console.log(error);
  })
  // const consumerKey =
  // const consumerSecret =
};

function promiseUpworkCredentials(userModel, userId) {
  return new Promise( (resolve, reject) => {
    userModel.findOne( { _id: userId }, { upworkKey: 1 }, (err, user) => {
      if (!user.upworkCredentials) {
          reject('Upwork credentials not found for current user')
      };

      resolve(user.upworkCredentials)
    })
  })
}
