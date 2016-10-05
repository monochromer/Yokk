import _ from 'lodash'
const defaultState = {
    list: []
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {

        case "FETCH_ISSUES":
            return Object.assign({}, state, { list: payload });
            break;

        case "DELETE_ISSUE":
            var issues = {};
            for(let date in state.list) {
                issues[date] = _.filter(state.list[date], (el) => el._id != payload.taskId );
            }
            return Object.assign({}, state, { list: issues });
            break;

        default:
            return state;
    }
}
