'use strict'

const nodemailer = require('nodemailer');

module.exports = function(mailOptions) {
  const smtpConfig = {
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return error;
    }
  });
}
