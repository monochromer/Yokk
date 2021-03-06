import _ from 'lodash'

var linkService = {
    status: "hidden"
};

const defaultState = {
    list: [],
    status: "ready",
    uploadingPhoto: false,
    linkService: linkService
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    var newState = "";
    switch (type) {
        case "ADD_USER":
            return Object.assign({}, state, { list: [...state.list, payload] });
            break;

        case "DELETE_USER":
            return Object.assign({}, state, { list: [...state.list, _.filter(state, (o) => o._id != payload)] });
            break;

        case "SET_READY_STATE":
            return Object.assign({}, state, { status: "ready" });
            break;

        case "UPDATE_USER":
            newState = _.filter(state.list, (o) => o._id != payload._id);

            return Object.assign({}, state, {
                status: "success",
                list: [...newState, payload],
                uploadingPhoto: false
            });
            break;

        case "DELETE_PROFILE_IMG":
            newState = Object.assign({}, state)

            const dummy = {
              small: "/img/dummy/960-720.png",
              medium: "/img/dummy/960-720.png",
              original: "/img/dummy/960-720.png"
            }
            _.find(newState.list, userObject => userObject._id === payload.userId).profileImg = dummy

            return newState
            break;

        case "UPDATE_USER_SUCCESS":
            newState = _.filter(state.list, (o) => o._id != payload._id);
            console.log(newState);
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

        case "LINK_SERVICE_OPEN":
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
            linkService = { status: 'hidden' };
            const newList = _.filter(state.list, (o) => o._id != payload._id);
            return Object.assign({}, state, {
                linkService: linkService,
                list: [...newList, payload]
            });

        case "LINK_SERVICE_CLOSE":
            linkService = { status: 'hidden' };
            return Object.assign({}, state, { linkService: linkService });
            break;

        case "PHOTO_UPLOADING_START":
            return Object.assign({}, state, { uploadingPhoto: true });
            break;

        default:
            return state;
    }
}
