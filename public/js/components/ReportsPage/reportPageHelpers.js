import _ from 'lodash';

export function getCheckboxStatus(checkBoxStatus, loginToCheck) {
    if (typeof checkBoxStatus !== 'undefined') {
      for (let login in checkBoxStatus) {
        if (loginToCheck === login) return checkBoxStatus[login];
      }
    }
    return false;
}
