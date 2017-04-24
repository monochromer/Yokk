import _ from "lodash"
import moment from 'moment'

export function findUserByLogin(users, login) {
	return _.find(users, (o) => o.login === login);
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
	let min = duration.get('minutes') < 10 ? "0" + duration.get('minutes') : duration.get('minutes');
	switch (type) {
		case 'short':
			return `${duration.get('hours')}:${min}`;

		default:
			return `${duration.get('hours')} h ${min} min`;
	}

}

export function groupTimeEntriesByDay(timeEntries) {
	let days = {};

	let sorted = _.orderBy(timeEntries, ['date'], ['desc']);
  for(let entryIdx = 0; entryIdx < sorted.length; entryIdx++){
		let day = dayBeatify(sorted[entryIdx].date);
		if(!days[day]) {
			days[day] = {
				list: [sorted[entryIdx]],
				totalDuration: sorted[entryIdx].duration
			}
		} else {
			days[day].list.push(sorted[entryIdx]);
			days[day].totalDuration += sorted[entryIdx].duration;
		}
	}

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