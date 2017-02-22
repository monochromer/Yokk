import _ from "lodash"
import moment from 'moment'

export function findUserByLogin(users, login) {
	return _.find(users, (o) => o.login == login);
}

export function refsToObject(refs) {
	var data = {};

	for(var field in refs) {
		data[field] = refs[field].value;
	}

	return data;
}

export function dayBeatify(date, format) {
	return moment(date, format).format("ddd, D MMM")
}

export function durationBeatify(minutes, type) {
	let duration = moment.duration(minutes, 'minutes');
	let min = duration.get('minutes') < 10 ? '0' + duration.get('minutes') : duration.get('minutes');
	let hours = duration.get('hours') < 10 ? '0' + duration.get('hours') : duration.get('hours');

	switch (type) {
		case 'short':
			return `${hours}:${min}`;

		default:
			return `${duration.get('hours')} h ${min} min`;
	}
}

export function groupTimeEntriesByDay(timeEntries) {
	let days = {};

	let sorted = _.orderBy(timeEntries, ['date'], ['desc']);
	sorted.map((timeEntry) => {
		let day = dayBeatify(timeEntry.date);
		if(!days[day]) {
			days[day] = {
				list: [timeEntry],
				totalDuration: timeEntry.duration
			}
		} else {
			days[day].list.push(timeEntry);
			days[day].totalDuration += timeEntry.duration;
		}
	});

	for(let day in days) {
		days[day].list = _.orderBy(days[day].list, ['date'], ['desc']);
	}

	return days;
}

export function getFromStateOrLocalStorage(name, state) {
	if(state[name]) {
		return state[name]
	} else if(localStorage.getItem(name)) {
		return localStorage.getItem(name)
	} else {
		return false;
	}
}
