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

export function durationBeatify(minutes) {
	let duration = moment.duration(minutes, 'minutes');
	let min = duration.get('minutes') < 10 ? "0" + duration.get('minutes') : duration.get('minutes');
	return duration.get('hours') + ":" + min;
}

export function groupTimeEntriesByDay(timeEntries) {
	var days = {};
	var sorted = _.orderBy(timeEntries, ['dateAdded'], ['desc']);
	sorted.map((timeEntry) => {
		let day = dayBeatify(timeEntry.dateAdded);
		if(!days[day]) {
			days[day] = {
				list: [timeEntry],
				totalDuration: timeEntry.duration
			};
		} else {
			days[day].list.push(timeEntry);
			days[day].totalDuration += timeEntry.duration;
		}
	});
	for(let day in days) {
		days[day].list = _.orderBy(days[day].list, ['dateCreated'], ['desc']);
	}

	return days;
}
