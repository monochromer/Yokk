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
	var duration = moment.duration(minutes, 'minutes');
	return duration.get('hours') + " h " + duration.get('minutes') + " min";
}

export function groupIssuesByDay(issues) {
	var days = {};
	var sorted = _.orderBy(issues, ['dateAdded'], ['desc']);
	console.log(sorted);
	sorted.map((issue) => {
		let day = dayBeatify(issue.dateAdded);
		if(!days[day]) {
			days[day] = {
				list: [issue],
				totalDuration: issue.duration
			};
		} else {
			days[day].list.push(issue);
			days[day].totalDuration += issue.duration;
		}
	});
	console.log(days);
	return days;
}
