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

export function populateProps(thisObject, state) {
    let propsToReturn = {};
    if (typeof thisObject !== 'undefined') {
        const user = thisObject.props.login;
        getUserFullName(user, state.users);
        let startDateFilter,
            endDateFilter;
        if (typeof state.usersActivities[user] !== 'undefined') {
            if (state.usersActivities.startDateFilter) {
                startDateFilter = moment(state.usersActivities.startDateFilter, 'DD.MM.YYYY').toDate()
            }
            if (state.usersActivities.endDateFilter) {
                endDateFilter = moment(state.usersActivities.endDateFilter, 'DD.MM.YYYY').toDate()
            }
            const entries = state.usersActivities[user].list;
            const periodFiltereEntries = _.filter(entries, function(o) {
                let checkStartDate,
                    checkEndDate;
                if (startDateFilter) {
                    checkStartDate = moment(o.dateCreated).isSameOrAfter(startDateFilter, 'day');
                }
                if (endDateFilter) {
                    checkEndDate = moment(o.dateCreated).isSameOrBefore(endDateFilter, 'day');
                }
                if ((typeof checkStartDate !== 'undefined') && (typeof checkEndDate !== 'undefined')) {
                    // console.log('case1');
                    return (checkStartDate && checkEndDate);
                } else if (typeof checkStartDate !== 'undefined') {
                    // console.log('case2');
                    return checkStartDate;
                } else if (typeof checkEndDate !== 'undefined') {
                    // console.log('case3');
                    return checkEndDate;
                } else {
                    // console.log('case4');
                    return true;
                }
            });
            propsToReturn.days = groupTimeEntriesByDay(periodFiltereEntries);
            propsToReturn.offset = state.usersActivities[user].offset;
            propsToReturn.allBatches = state.usersActivities[user].helpers.allBatches;
        } else {
            propsToReturn.offset = 0;
        }
    }

    return propsToReturn;
}

export function inititializeOffset(userActivities) {
    if (typeof userActivities !== 'undefined') {
        return userActivities.offset;
    }
    return 0;
}
