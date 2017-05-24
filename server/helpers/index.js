export function isValidName(name){
  const onlyAllowedChars = new RegExp( /^[a-zA-Zа-яА-Я0-9\-.]*$/ ).test( name );
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
