'use strict'

const nodemailer = require('nodemailer');
const smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASS
    },
    rejectUnauthorized: false
};
const transporter = nodemailer.createTransport(smtpConfig);

module.exports = function(credentials) {

    let text;
    let htmlToSend = `\
  <div>Login: <b>${credentials.login}</b></div>\
  <div>Password: <b>${credentials.password}</b></div>\
  <div><a href='http://eop.soshace.com/'>eop.soshace.com</a></div>`;

    let mailOptions = {
        from: '"Soshace team 👥" <bot@izst.ru>', // sender address
        to: credentials.email, // list of receivers
        subject: 'Congratulations! You\'re now registered user', // Subject line
        text: text,
        html: htmlToSend // html body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return error;
        }
    });
}
