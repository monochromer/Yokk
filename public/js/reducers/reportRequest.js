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
