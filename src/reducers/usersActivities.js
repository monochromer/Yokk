import _ from 'lodash';
import moment from 'moment';
const defaultState = {};

export default function(state = defaultState, action) {
    const {
        type,
        payload,
        user,
        startDate,
        endDate,
        oldestDate,
        filter,
        currentUser
    } = action;

    switch (type) {
        case "INITIALIZE_USER_ACTIVITY":
            {
                let newState = Object.assign({}, state);

                if (!newState[user]) {
                  newState[user] = {};
                }

                if (!newState[user].list) {
                  newState[user].list = payload;
                } else {
                  newState[user].list.concat(payload);
                }

                newState[user].offset = newState[user].list.length;

                let allBatches = (payload.length == 0 || payload.lenght < 10) ? true : false;
                newState[user].helpers = {};
                newState[user].helpers.allBatches = allBatches;

                if (!newState[user].startDate) {
                    newState[user].startDate = newState[user].oldestDate = moment(payload[payload.length - 1].dateCreated).format('DD.MM.YYYY');
                    newState[user].endDate = moment(payload[0].dateCreated).format('DD.MM.YYYY');
                }

                newState[user].filter = false;

                return newState;
                break;
            }

        case "FETCH_USER_ACTIVITY":
            {
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
            }


        case "FETCH_USER_ACTIVITY_ON_LOAD_MORE":
            {
                let newState = Object.assign({}, state);

                return newState;
                break;
            }

        case "SAVE_USER_TO_SHOW":
            return Object.assign({}, state, {
                showUser: user
            });
            break;

        case "STORE_OLDEST_DATE":
            {
                let newState = Object.assign({}, state);
                newState[user].oldestDate = oldestDate;
                return newState;
                break;
            }

        case "STORE_USER_ACTIVITY_PERIOD_FILTER":
            let stateAfterPeriodChange = Object.assign({}, state);
            stateAfterPeriodChange[user].startDate = startDate;
            stateAfterPeriodChange[user].endDate = endDate;
            return stateAfterPeriodChange;
            break;

        case "USER_ACTIVITY_SET_FILTER":
            {
                let newState = Object.assign({}, state);
                newState[user].filter = filter;
                return newState;
                break;
            }

        default:
            return state;
    }
}
