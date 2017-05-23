'use strict'

const valid = require("valid-email")

exports.create = function (req, res) {
  const { user } = req;

  if (!user) {
    res.status(401).send();
    return;
  }

  const { Company, User, Team } = req.app.db.models;
  const { name, address, billingInfo } = req.body;
  const originatorEmail = user.email;
  const newCompany = new Company({
    originatorEmail: user.email,
    name,
    address,
    billingInfo,
    emailConfirmed: true
  });
  newCompany.save((err, company) => {
    if(err){
      console.log(err);
      res.status(500).send("Server error");
      return false;
    }
    User.find({_id: user._id}, (err, user) => {
      if(err){
        console.log(err);
        res.status(500).send("Server error");
        return false;
      }
      const newProfile = Object.assign({}, user.companies[0]);
      newProfile.companyId = company._id;
      newProfile.role = 'owner';
      user.companies.push(newProfile);
      user.save((err, user) => {
        if(err){
          console.log(err);
          res.status(500).send("Server error");
          return false;
        }
        res.send();
      });
    });
  })

};


// GET
exports.read = function (req, res) {
  const { Company } = req.app.db.models
  const companyIds = req.user.companies.map(el => el.companyId);
  Company.find({ _id: { $in: companyIds } }, {
    _id: 1,
    name: 1,
    address: 1,
    billingInfo: 1
  }, (err, companies) => {
    if(err){
      console.log(err);
      res.status(500).send();
      return false;
    }
    res.json(companies);
  });
};

// PUT
exports.update = function (req, res, next) {
  const { Company } = req.app.db.models
  const { companyId } = req.body //it should probably be gotten by params
  const { name, originatorEmail, teams } = req.body

  const update = {}

  if (name) update.name = name
  if (originatorEmail) update.originatorEmail = originatorEmail
  if (teams) getUpdatedTeamsArray(update)

  Company.update(companyId, { $set: update })

}

// DELETE
exports.delete = function (req, res, next) {
  const { Company } = req.app.db.models
  const { companyId } = req.body

  if (!companyId) return res.status(500).send()

  Company.delete(companyId, (err, result) => {
    if (err) next(err)
    res.status(200).send(result)
  })
};
