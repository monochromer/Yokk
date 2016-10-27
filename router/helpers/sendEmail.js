'use strict'

const nodemailer = require('nodemailer');
const smtpConfig = {
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASS
    },
    rejectUnauthorized: false
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = function(mailOptions) {

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return error;
        }
    });
}
