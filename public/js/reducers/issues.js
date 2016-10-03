const defaultState = [];

export default function(state = defaultState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {

        case "FETCH_ISSUES":
            return payload;
            break;

        default:
            return state;
    }
}
