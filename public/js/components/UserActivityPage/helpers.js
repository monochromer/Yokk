import {groupTimeEntriesByDay} from '../../helpers';
import moment from 'moment';
import _ from 'lodash';

export function getDateState(storeDate) {
  //get old date which is unlikely to be entered (the same which is in the filterPeriod.jsx)
  if (storeDate === '23.05.1995') return '';
  if (typeof storeDate !== 'undefined') {
    return storeDate;
  }
  return '';
}

export function getUserFullName(login, usersArray) {
    let user = _.find(usersArray, function(o) {
        return o.login === login;
    });
    if (typeof user !== 'undefined') {
        if (typeof user.fullname !== 'undefined') {
            return user.fullname;
        }
    }
    return `(login: ${login})`;
}

export function filterPeriod(userActivity) {
  const startDateFilter = moment(userActivity.startDate, 'DD.MM.YYYY').toDate();
  const endDateFilter = moment(userActivity.endDate, 'DD.MM.YYYY').toDate();

  const filteredEntries = _.filter(userActivity.list, (o) => {
    return moment(o.dateCreated).isSameOrAfter(startDateFilter, 'day') && moment(o.dateCreated).isSameOrBefore(endDateFilter, 'day');
  });

  return filteredEntries;
}
