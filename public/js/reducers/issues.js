const defaultState = {
    list: []
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {

        case "FETCH_ISSUES":
            return Object.assign({}, state, { list: payload });
            break;

        default:
            return state;
    }
}
