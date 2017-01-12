'use strict'

const sendEmail = require('../../helpers/sendEmail')
const valid = require("valid-email")

exports.create = function (req, res, next) {
  const { Company } = req.app.db.models
  const step = req.body.step
  const email = req.body.email

  if (!valid(email)) {
    var error = new Error();
    error.name = "Email is not valid";
    return next(error.name);
  }

  const code = req.body.code
  const login = req.body.login
  const name = req.body.name

  switch (step) {
    case '0':
      createCompanyWithGivenEmail(Company, email, sendEmail).then(company => {
        res.status(200).send(company);
      }).catch(reason => {
        res.status(500).send();
        next(reason);
      });
      break;

    case '1':
      checkConfirmationCode(code, email).then(company => {
        res.status(200).send(company);
      }).catch(reason => {
        res.status(500).send();
        next(reason);
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
      createCompanyWithGivenEmail(Company, email, sendEmail).then(company => {
        res.status(200).send(company);
      }).catch(reason => {
        res.status(500).send();
        next(reason);
      });
      break;
  }

  function createCompanyWithGivenEmail(companyModel, email, sendEmailFunc) {
    return new Promise((resolve, reject) => {
      if (!email) return reject(new Error());

      const companyInitialData = {
        originatorEmail: email
      }

      companyModel.findOne(companyInitialData, (err, company) => {
        if (company && company.confirmed) {
          let error = new Error();
          error.name = "This company is already created and confirmed";
          return next(error.name);
        }

        companyInitialData.confirmationCode = "111111";
        // companyInitialData.confirmationCode = Math.random().toString().slice(2, 8);

        const htmlToSend = `<div>Confirmation code ${companyInitialData.confirmationCode}</div>`;

        const mailOptions = {
          from: '"Soshace team 👥" <bot@izst.ru>',
          to: email,
          subject: 'Your company is being processed. Please follow the instructions',
          html: htmlToSend
        };

        if (!company) {
          const newCompany = new companyModel(companyInitialData);
          newCompany.save((err, company) => {
            if (err) next(err);
            resolve(company);
            sendEmailFunc(mailOptions);
          })
        } else {
          resolve(company);
          sendEmailFunc(mailOptions);
        }
      })
    })
  }

  function checkConfirmationCode(confirmationCode, email) {
    return new Promise((resolve, reject) => {
      Company.findOne({
        originatorEmail: email
      }, (err, company) => {
        if (err) return reject(err);
        if (!company) return reject(new Error());
        if (company.confirmationCode !== confirmationCode) return reject(new Error());
        if (company.confirmed === true) return reject(new Error());

        company.confirmed = true;
        company.save();

        resolve(company);
      })
    })
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
  const { companyName } = req.params

  // change name to _id as searchable field
  Company.read(companyName, (err, company) => {
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
