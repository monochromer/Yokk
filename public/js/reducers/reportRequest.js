import _ from 'lodash';
import moment from 'moment';

const defaultState = {};

export default function(state = defaultState, action) {
    const {
        type,
        payload,
        startDate,
        endDate,
        user
    } = action;

    switch (type) {
        case "SAVE_USER_FOR_REPORT_TO_STORE":
            let usersAfterAddition = state.users || [];
            usersAfterAddition.push(user);
            return Object.assign({}, state, {
                users: usersAfterAddition
            });
            break;

        case "DELETE_USER_FOR_REPORT_FROM_STORE":
            const usersAfterDeletion = _.filter(state.users, (o) => {return o !== user});
            return Object.assign({}, state, {
                users: usersAfterDeletion
            });
            break;

        case "STORE_REPORT_PERIOD":
            return Object.assign({}, state, {
                startDate: startDate,
                endDate: endDate
            });
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
