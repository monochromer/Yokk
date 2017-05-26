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

export function validatePassword(passwordNew, passwordRepeat){
  const errors = {}
  const passwordContainsDigits = new RegExp( /\d/ ).test( passwordNew );
  const passwordContainsLowercaseLatinLetter = new RegExp( /[a-z]/ ).test( passwordNew );
  const passwordContainsUppercaseLatinLetter = new RegExp( /[A-Z]/ ).test( passwordNew );
  const weakPassMsg = "The password is too weak. It must be at least 8 symbols \
    long, include lowercase, capital letters and digits.";
  if(passwordNew.length < 8){
    errors.passwordNew = weakPassMsg;
  }
  if(passwordNew.length > 100){
    errors.passwordNew = "Password must be 100 characters or less";
  }
  if(!passwordContainsDigits){
    errors.passwordNew = weakPassMsg;
  }
  if(!passwordContainsLowercaseLatinLetter){
    errors.passwordNew = weakPassMsg;
  }
  if(!passwordContainsUppercaseLatinLetter){
    errors.passwordNew = weakPassMsg;
  }
  if(passwordNew !== passwordRepeat){
    errors.passwordRepeat = "Passwords do not match!";
  }
  return isEmpty(errors) ? null : errors;
}
