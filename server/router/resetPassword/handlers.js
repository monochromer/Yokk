import sendEmail from '../helpers/sendEmail';
import validator from 'validator';
import { isEmpty } from 'lodash';

export const sendLink = (req, res) => {
  const { User } = req.app.db.models;
  const { email } = req.body;

  if(!validator.isEmail(email)){
    res.status(400).send('Invalid email');
    return false;
  }
  User.findOne({email}, (err, user) => {
    if(err){
      console.log(err);
      res.status(500).send('Server error');
      return false;
    }
    if(!user){
      res.status(400).send('This e-mail is not in the system');
      return false;
    }
    const secret = makeRandomString();
    user.resetPasswordSecret = secret;
    user.save((err) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return false;
      }
      const { NODE_ENV, LINK_BASE_DEV, LINK_BASE_PROD } = process.env
      const linkBase = (NODE_ENV === 'development' ? LINK_BASE_DEV : LINK_BASE_PROD)

      const link = `${linkBase}reset_password?email=${email}&secret=${secret}`;
      const htmlToSend = `<div>You or someone else asked us to reset your password.<br>
        If it was not you ignore this message.<br>
        If it was you, click on the link below to reset your password and create a new one.<br>
        ${link}
        <br><br>
        Best regards,<br>
        Yokk! Team</div>`;

      const mailOptions = {
        from: 'Yokk! team',
        to: email,
        subject: 'Forgot password',
        html: htmlToSend
      };

      sendEmail(mailOptions);

      res.send();
    });
  });
}

export const resetPassword = (req, res) => {
  const { User } = req.app.db.models;
  const { email, password, passwordRepeat, secret } = req.body;

  if(!validator.isEmail(email)){
    res.status(400).send('Invalid email');
    return false;
  }
  User.findOne({email}, (err, user) => {
    if(err){
      console.log(err);
      res.status(500).send('Server error');
      return false;
    }
    if(!user){
      res.status(400).send('This e-mail is not in the system');
      return false;
    }
    if(
      !password.match(/[a-z]/) ||
      !password.match(/[A-Z]/) ||
      !password.match(/[0-9]/) ||
      password.length < 8
    ){
      res.status(400).send('The password is too weak. It must be at least 8' +
        ' symbols long, include lowercase, capital letters and digits.');
      return false;
    }
    if(password.length > 100){
      res.status(400).send('Password must be 100 characters or less');
      return false;
    }
    if(password !== passwordRepeat){
      res.status(400).send('Passwords do not match!');
      return false;
    }
    if(
      !user.resetPasswordSecret ||
      !user.resetPasswordSecret.length ||
      user.resetPasswordSecret !== secret
    ){
      res.status(403).send('Forbidden');
      return false;
    }
    user.password = password;
    user.resetPasswordSecret = '';
    user.save((err) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return false;
      }
      res.send();
    });
  });
}

function makeRandomString(){
  const length = 50;
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for(let i = 0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}