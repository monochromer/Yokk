import _ from 'lodash';

export function getCheckboxStatus(checkBoxStatus, loginToCheck) {
    if (typeof checkBoxStatus !== 'undefined') {
        for (let login in checkBoxStatus) {
            if (loginToCheck === login) return checkBoxStatus[login];
        }
    }
    return false;
}

export function convertToHours(durationInMinutes, digit) {
    const numberOfMinutes = durationInMinutes % 60;
    const digitsAfterComma = digit || 0;
    const numberOfHours = (durationInMinutes / 60).toFixed(digitsAfterComma)
    return `${numberOfHours} h ${numberOfMinutes} min`;
}
