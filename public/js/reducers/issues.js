import _ from 'lodash'
import moment from 'moment'
const defaultState = []

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case "CREATE_ISSUE":
            return state.concat(payload);
            break;
            
        case "FETCH_ISSUES":
            return payload;
            break;

        case "DELETE_ISSUE":
            return _.filter(state, (el) => el._id != payload.taskId );
            break;

        default:
            return state;
    }
}
