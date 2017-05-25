import { isEmpty } from 'lodash';

export function isValidName(name){
  const onlyAllowedChars = new RegExp( /^[a-zA-Zа-яА-Я 0-9\-.]*$/ ).test( name );
  if(
    typeof name !== 'string' ||
    !onlyAllowedChars ||
    name[0] === '-' ||
    name[name.length - 1] === '-' ||
    name[0] === '.' ||
    name[name.length - 1] === '.' ||
    name.indexOf('..') !== -1
  ){
    return false;
  }
  return true;
}

export function validatePassword(password, passwordRepeat){
  const errors = {}
  const passwordContainsDigits = new RegExp( /\d/ ).test( password );
  const passwordContainsLowercaseLatinLetter = new RegExp( /[a-z]/ ).test( password );
  const passwordContainsUppercaseLatinLetter = new RegExp( /[A-Z]/ ).test( password );
  const weakPassMsg = "The password is too weak. It must be at least 8 symbols \
    long, include lowercase, capital letters and digits.";
  if(password.length < 8){
    errors.password = weakPassMsg;
  }
  if(password.length > 100){
    errors.password = "Password must be 100 characters or less";
  }
  if(!passwordContainsDigits){
    errors.password = weakPassMsg;
  }
  if(!passwordContainsLowercaseLatinLetter){
    errors.password = weakPassMsg;
  }
  if(!passwordContainsUppercaseLatinLetter){
    errors.password = weakPassMsg;
  }
  if(password !== passwordRepeat){
    errors.passwordRepeat = "Passwords do not match!";
  }
  return isEmpty(errors) ? null : errors;
}
