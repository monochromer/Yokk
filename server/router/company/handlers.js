'use strict'

const sendEmail = require('../helpers/sendEmail')
const valid = require("valid-email")

exports.create = function (req, res, next) {
  const { Company } = req.app.db.models;
  const { email, step, code, login, name } = req.body;

  if (!valid(email)) {
    res.status(400).send("Invalid e-mail");
    return false;
  }

  switch (step) {
    case '0':
      const companyInitialData = {
        originatorEmail: email
      }

      Company.findOne(companyInitialData, (err, company) => {
        if(err){
          console.log(err);
          res.status(500).send("Server error");
          return false;
        }
        if (company && company.emailConfirmed) {
          res.status(409).send("This email address is already registered. You" +
            " can log in. If you forgot your password, you can reset it.");
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

        const { NODE_ENV } = process.env;
        const confCode = (NODE_ENV === 'development') ? '111111' :
          Math.random().toString().slice(2, 8);
        companyInitialData.confirmationCode = confCode;
        companyInitialData.codeSentDate = Date();
        companyInitialData.codeTries = 0;

        const htmlToSend = "<div>Your e-mail was successfully registered in " +
          "system of Yokk!<br>To confirm it, enter the code below or use the " +
          "link.<br><br>Code: " + confCode + "<br>Confirmation link:<br><br>" +
          "Thank you for registration!<br>Yokk! Team</div>";

        const mailOptions = {
          from: '"Soshace team 👥" <bot@izst.ru>',
          to: email,
          subject: 'Your company is being processed. Please follow the instructions',
          html: htmlToSend
        };

        if(!company){
          const newCompany = new Company(companyInitialData);
          newCompany.save((err, company) => {
            if(err){
              console.log(err);
              res.status(500).send("Server error");
              return false;
            }
            res.status(200).send(company);;
            sendEmail(mailOptions);
          })
        }
        else{
          company.confirmationCode = confCode;
          company.codeSentDate = Date();
          company.codeTries = 0;
          company.save((err, company) => {
            if(err){
              console.log(err);
              res.status(500).send("Server error");
              return false;
            }
            res.status(200).send(company);;
            sendEmail(mailOptions);
          });
        }
      });
      break;

    case '1':
      Company.findOne({originatorEmail: email}, (err, company) => {
        if(err){
          console.log(err);
          res.status(500).send("Server error");
          return false;
        }
        if(!company){
          res.status(400).send("Company is not found");
          return false;
        }
        if(company.emailConfirmed === true){ //set to true on last step
          res.status(409).send("Company is already confirmed");
          return false;
        }
        if(company.codeTries > 2){
          res.status(403).send("You entered an incorrect code 3 times and now" +
            " your current code is deactivated. Click here to get a new " +
            "confirmation code.");
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
        res.status(200).send(company);
      });
      break;

    case '2':
      saveCompanyOriginatorLogin(login, email).then(company => {
        res.status(200).send(company);
      }).catch(reason => {
        res.status(500).send();
        next(reason);
      });
      break;

    case '4':
      saveCompanyName(name, email).then(company => {
        res.status(200).send(company);
      }).catch(reason => {
        res.status(500).send();
        next(reason);
      });
      break;

    default:
  }

  function saveCompanyOriginatorLogin(login, originatorEmail) {
    return new Promise((resolve, reject) => {
      if (!login) reject('!login');
      Company.findOne({
        originatorEmail: originatorEmail
      }, (err, company) => {
        if (err) next(err);
        if (company === null) return reject(new Error());
        if (company.confirmed === false) return reject(new Error());
        if (company.originator) return reject(new Error());
        if (typeof login !== 'string' || login.length > 30) return reject(new Error());

        company.originator = login;
        company.save();
        resolve(company);
      })
    })
  }

  function saveCompanyName(name, originatorEmail) {
    return new Promise((resolve, reject) => {
      Company.findOne({
        originatorEmail: originatorEmail
      }, (err, company) => {
        if (err) next(err);
        if (company === null) return reject(new Error());
        if (company.name) return reject(new Error());
        if (typeof name !== 'string' || name.length > 30) return reject(new Error());

        company.name = name;
        company.save();
        resolve(company);
      })
    })
  }

};


// GET
exports.read = function (req, res, next) {
  const { Company } = req.app.db.models
  const { companyId } = req.query

  // change name to _id as searchable field
  Company.read(companyId, (err, company) => {
    if (err) next(err);
    if (company) {
      return res.status(200).send(company);
    }
    // no team found
    res.status(500).send();
  })

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

exports.add = function (req, res, next) {
  const { user } = req;

  if (!user) {
    res.status(401).send();
    return;
  }

  const { Company, User, Team } = req.app.db.models;
  const name = req.body.name;
  const originatorEmail = user.email;
  const team = new Team({
    teamOriginator: user._id,
    members: [user._id]
  });
  const company = new Company({
    name,
    originatorEmail,
    teams: [team._id],
    emailConfirmed: true
  });

  company.save()
    .then(savedCompany => {
      res.send(savedCompany);
      return User.findOne({ _id: user._id })
    })
    .then(someUser => {
      someUser.companies.push(company._id);
      someUser.companies.push(team._id);
      someUser.save();
      team.save();
    })
    .catch(err => {
      res.send(err);
    });
};
