import _ from 'lodash'
import moment from 'moment'
const defaultState = []

export default function(state = defaultState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case "CREATE_ISSUE":
            return state.concat(payload);
            break;

        case "FETCH_ISSUES":
            return payload;
            break;

        case "FETCH_NEXT_BATCH":
            return state.concat(payload);
            break;

        case "FETCH_REDMINE_ISSUES":
            let withoutRedmine = _.filter(state, (el) => el.taskSource != "redmine");
            return withoutRedmine.concat(payload);
            break;

        case "DELETE_ISSUE":
            return _.filter(state, (el) => el._id != payload.taskId);
            break;

        case "UPDATE_ISSUE":
            var newState = _.filter(state, (o) => o._id != payload._id);
            return [...newState, payload]

        default:
            return state;
    }
}
