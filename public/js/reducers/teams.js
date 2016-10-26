
export default function(state = {}, action) {
    const { type, payload } = action;

    switch (type) {

        case "STEP_0":
            return Object.assign({}, state, { email: action.createItem.data.email });
            break;

        default:
            return state;
            break;
    }
}