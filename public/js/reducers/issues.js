import _ from 'lodash'
import moment from 'moment'
const defaultState = []

export default function(state = defaultState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {

        case "FETCH_ISSUES":
            return payload;
            break;

        case "FETCH_REDMINE_ISSUES":
            return payload;
            break;

        case "DELETE_ISSUE":
            var issues = {};
            for (let date in state.list) {
                issues[date] = _.filter(state.list[date], (el) => el._id != payload.taskId);
            }
            return Object.assign({}, state, {
                list: issues
            });
            break;

        default:
            return state;
    }
}
