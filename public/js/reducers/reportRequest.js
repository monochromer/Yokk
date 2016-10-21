import _ from 'lodash';
import moment from 'moment';

const defaultState = {};

export default function(state = defaultState, action) {
    const {
        type,
        payload,
        startDateFilter,
        endDateFilter,
        optionalPeriod
    } = action;

    switch (type) {
        case "ADD_USER_TO_REPORT":
            let newState = Object.assign({}, state);

            if (typeof newState.users === 'undefined') {
                newState.users = [];
            }
            newState.users.push(payload.login);

            if (typeof newState.checkbox === 'undefined') {
                newState.checkbox = {};
            }
            newState.checkbox[payload.login] = true;

            return newState;
            break;

        case "DELETE_USER_FROM_REPORT":
            let stateAfterUserDeleted = Object.assign({}, state);
            _.remove(stateAfterUserDeleted.users, function(login) {
                return login === payload.login;
            });
            stateAfterUserDeleted.checkbox[payload.login] = false;
            return stateAfterUserDeleted;
            break;

        case "CHOOSE_PERIOD_FOR_REPORT":
            if (typeof startDateFilter !== 'undefined') {
                return Object.assign({}, state, {
                    startDateFilter: startDateFilter
                });
            } else {
                return Object.assign({}, state, {
                    endDateFilter: endDateFilter
                });
            }
            break;

        case "STORE_OPTIONAL_PERIOD_FILTER":
            let periodChanges = {endDateFilter: moment().format('DD.MM.YYYY')};

            switch (optionalPeriod) {
                case "This week":
                  periodChanges.startDateFilter = moment().startOf('isoWeek').format('DD.MM.YYYY');
                  break;
                case "Last week":
                  periodChanges.startDateFilter = moment().subtract(1, 'week').format('DD.MM.YYYY');
                  break;
                case "This month":
                  periodChanges.startDateFilter = moment().startOf('month').format('DD.MM.YYYY');
                  break;
                case "Last month":
                  periodChanges.startDateFilter = moment().subtract(1, 'month').format('DD.MM.YYYY');
                  break;
                default:
                  periodChanges = {};
            }

            return Object.assign({}, state, periodChanges);
            break;

        case "FETCH_REPORT_DATA":
            return Object.assign({}, state, {
                responseData: payload
            });
            break;

        default:
            return state;
    }
}
