export function getCheckboxStatus(checkBoxStatus, loginToCheck) {
  if (typeof checkBoxStatus !== 'undefined') {
    for (let login in checkBoxStatus) {
      if (loginToCheck === login) return checkBoxStatus[login];
    }
  }
  return false;
}

export function convertToHours(durationInMinutes) {
  if (typeof durationInMinutes === 'undefined') {
    return '0 h 0 min';
  }
  const numberOfMinutes = durationInMinutes % 60;
  const numberOfHours = Math.floor(durationInMinutes / 60);
  return `${numberOfHours} h ${numberOfMinutes} min`;
}

export function getDefinedOrEmptyString(element) {
  if (typeof element === 'undefined') {
    return '';
  }
  return element;
}
