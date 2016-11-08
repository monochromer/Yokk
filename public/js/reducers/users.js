import _ from 'lodash'

var linkService = {
    status: "hidden"
};

const defaultState = {
    list: [],
    status: "ready",
    linkService: linkService
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

        case "LINK_SERVICE":
            linkService = {
                status: 'ready',
                service: action.service,
                userId: action.userId
            };
            return Object.assign({}, state, { linkService: linkService });
            break;

        case "LINK_SERVICE_START":
            linkService = { status: 'loading' };
            return Object.assign({}, state, { linkService: linkService });
            break;

        case "LINK_SERVICE_SUCCESS":
            linkService = { status: 'success' };
            const newList = _.filter(state.list, (o) => o._id != payload._id);
            return Object.assign({}, state, {
                linkService: linkService,
                list: [...newList, payload]
            });

        case "LINK_SERVICE_CLOSE":
            linkService = { status: 'hidden' };
            return Object.assign({}, state, { linkService: linkService });
            break;

        default:
            return state;
    }
}
