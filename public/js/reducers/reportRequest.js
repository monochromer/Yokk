import _ from 'lodash';
import moment from 'moment';

const defaultState = {};

export default function(state = defaultState, action) {
    const {
        type,
        payload,
        startDate,
        endDate,
        users
    } = action;

    switch (type) {
        case "STORE_REPORT_USERS":
            return Object.assign({}, state, {
                users: users
            });
            break;

        case "STORE_REPORT_PERIOD":
            return Object.assign({}, state, {
                startDate: startDate,
                endDate: endDate
            });
            break;

        case "FETCH_REPORT_DATA":
            console.log('Reducer FETCH_REPORT_DATA payload');
            console.log(payload);
            return Object.assign({}, state, {
                responseData: payload
            });
            break;

        default:
            return state;
    }
}
