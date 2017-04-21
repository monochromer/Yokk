import moment from 'moment'

export function validateDuration(duration) {
    duration = moment.duration(duration);
    return (moment.isDuration(duration) && (duration.asMinutes() > 0));
}
