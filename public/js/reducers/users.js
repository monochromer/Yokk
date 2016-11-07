import _ from 'lodash'

const defaultState = {
    list: [],
    status: "ready"
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case "ADD_USER":
            return Object.assign({}, state, { list: [...state.list, payload] });
            break;

        case "DELETE_USER":
            return Object.assign({}, state, { list: [...state.list, _.filter(state, (o) => o.login != payload)] });
            break;

        case "SET_READY_STATE":
            return Object.assign({}, state, { status: "ready" });
            break;

        case "UPDATE_USER_SUCCESS":
            const newState = _.filter(state.list, (o) => o._id != payload._id);
            return Object.assign({}, state, {
                status: "success",
                list: [...newState, payload]
            });
            break;

        case "UPDATE_USER_START":
            return Object.assign({}, state, { status: "loading" });
            break;

        case "FETCH_USERS":
            return Object.assign({}, state, { list: payload });
            break;

        case "FETCH_TEAM_USERS":
            return Object.assign({}, state, { list: payload });
            break;

        default:
            return state;
    }
}
