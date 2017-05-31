import _ from "lodash"
import moment from 'moment'

export function findUserByEmail(users, email) {
	return _.find(users, (o) => o.email === email);
}

export function refsToObject(refs) {
	var data = {};

	for(var field in refs) {
		data[field] = refs[field].value;
	}

	return data;
}

export function dayBeatify(date, format) {
	return moment(date, format).format("MMM D, Y (ddd)")
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

export function isValidName(name){
  const onlyAllowedChars = new RegExp( /^[a-zA-Zа-яА-Я0-9\-.]*$/ ).test( name );
  if(
    typeof name !== 'string' ||
    !onlyAllowedChars ||
    name[0] === '-' ||
    name[name.length - 1] === '-' ||
    name[0] === '.' ||
    name[name.length - 1] === '.' ||
    name.indexOf('..') !== -1
  ){
    return false;
  }
  return true;
}

export function isManager(user, teams){
  const { role } = user;
  if(role === 'owner' || role === 'admin'){
    return true;
  }
  for(let index = 0; index < teams.length; index++){
    const isManager = teams[index].members.find((el) => {
      return (
        el.manager === true &&
        el.userId === user._id
      )
    });
    if(isManager){
      return true;
    }
  }
  return false;
}
