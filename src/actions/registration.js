import { REGISTER_COMPANY_URL } from '../constants';
import axios from 'axios';

export function checkCompanyEmail(email, callback){
  axios.post(REGISTER_COMPANY_URL, {
    email,
    step: '0'
  }).then(() => {
    localStorage.reg_email =email;
    localStorage.reg_timerStart = Date.now();
    localStorage.reg_code = "";
    callback();
  }, (err) => {
    callback(err.response.data);
  });
}

export function checkConfirmationCode(code, email, callback){
  axios.post(REGISTER_COMPANY_URL, {
    code,
    email,
    step: '1'
  }).then(() => {
    localStorage.reg_code =code;
    localStorage.reg_email =email;
    callback();
  }, (err) => {
    callback(err.response.data);
  });
}


export function step2(firstName, lastName) {
  localStorage.reg_firstName =firstName;
  localStorage.reg_lastName =lastName;
}

export function step3(password) {
  localStorage.reg_password =password;
}

export function step4(companyName) {
  localStorage.reg_companyName =companyName;
}

export function finishRegistration(data, callback) {
  axios.post(REGISTER_COMPANY_URL, data).then((res) => {
    callback(null, res);
    localStorage.removeItem('reg_email');
    localStorage.removeItem('reg_code');
    localStorage.removeItem('reg_firstName');
    localStorage.removeItem('reg_lastName');
    localStorage.removeItem('reg_password');
    localStorage.removeItem('reg_companyName');
    localStorage.removeItem('reg_timerStart');
  }, (err) => {
    callback(err);
  });
}

export function inviteMembers(teamId, newMembers, companyId, userName, companyName) {
  axios.post('/api/teams/addTeamMembers', {
    teamId,
    invitedEmails: newMembers,
    companyId,
    userName,
    companyName
  });
}

export function createCompany(name, originatorEmail) {
  return {
    type: "CREATE_COMPANY",
    createItem: {
      url: 'api/add-company',
      data: {name}
    }
  }
}
