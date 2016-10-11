import _ from 'lodash'
import moment from 'moment'
const defaultState = []

export default function(state = defaultState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case "CREATE_TIME_ENTRY":
            return state.concat(payload);
            break;

        case "FETCH_NEXT_TIME_ENTRY_BATCH":
            return state.concat(payload);
            break;

        case "FETCH_REDMINE_TIME_ENTRIES":
            let withoutRedmine = _.filter(state, (el) => el.entrySource != "redmine");
            return withoutRedmine.concat(payload);
            break;

        case "DELETE_TIME_ENTRY":
            return _.filter(state, (el) => el._id != payload.taskId);
            break;

        case "UPDATE_TIME_ENTRY":
            const newState = _.filter(state, (o) => o._id != payload._id);
            return [...newState, payload]

        default:
            return state;
    }
}
