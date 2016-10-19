import {groupTimeEntriesByDay} from '../../helpers';

export function populateProps(thisObject, state) {
  let propsToReturn = {};
  if (typeof thisObject !== 'undefined') {
    const user = thisObject.props.login;
    // console.log('UserActivityTable -> getProps() -> this.props');
    // console.log(this.props);
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
            // console.log(checkStartDate);
            // console.log(checkEndDate);

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
        // console.log(entries);
        // console.log(periodFiltereEntries);
        propsToReturn.days = groupTimeEntriesByDay(periodFiltereEntries);
        propsToReturn.offset = state.usersActivities[user].offset;
        propsToReturn.allBatches = state.usersActivities[user].helpers.allBatches;
    } else {
        propsToReturn.offset = 0;
    }
  }
  return propsToReturn;
}
