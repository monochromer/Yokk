import _ from 'lodash';

export function getCheckboxStatus(checkBoxStatus, loginToCheck) {
    if (typeof checkBoxStatus !== 'undefined') {
        for (let login in checkBoxStatus) {
            if (loginToCheck === login) return checkBoxStatus[login];
        }
    }
    return false;
}

export function convertToHours(durationInMinutes) {
    const numberOfMinutes = durationInMinutes % 60;
    const numberOfHours = Math.floor(durationInMinutes / 60);
    return `${numberOfHours} h ${numberOfMinutes} min`;
}
