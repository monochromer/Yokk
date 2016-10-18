import _ from 'lodash';
import moment from 'moment';
const defaultState = {};

export default function(state = defaultState, action) {
    const {
        type,
        payload,
        user,
        startDateFilter,
        endDateFilter
    } = action;

    switch (type) {
        case "FETCH_USER_ACTIVITY":
            let newState = Object.assign({}, state);
            if (typeof newState[user] === 'undefined') {
                newState[user] = {};
            }
            if (typeof newState[user].list !== 'undefined') {
                newState[user].list = newState[user].list.concat(payload);
                newState[user].offset = newState[user].list.length;
            } else {
                newState[user].list = payload;
                newState[user].offset = newState[user].list.length;
            }
            let allBatches = (payload.length == 0 || payload.lenght < 10) ? true : false;
            newState[user].helpers = {};
            newState[user].helpers.allBatches = allBatches;

            return newState;
            break;

        case "SAVE_USER_TO_SHOW":

            return Object.assign({}, state, {
                showUser: user
            });
            break;

        case "STORE_PERIOD_FILTER":

            return Object.assign({}, state, {
                startDateFilter: startDateFilter,
                endDateFilter: endDateFilter
            });
            break;

        default:
            return state;
    }
}
