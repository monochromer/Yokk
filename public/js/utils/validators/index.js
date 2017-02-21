import moment from 'moment'

export function validateDuration(duration) {
    duration = moment.duration(duration);
    return (moment.isDuration(duration) && (duration.asMinutes() > 0));
}

export function validateString(str) {
    return typeof str === 'string' && str.length > 0;
}

export function validateDateFormat(date) {
    return /^\d{2}\.\d{2}\.\d{4}$/.test(date);
}
