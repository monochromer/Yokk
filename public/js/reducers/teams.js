import { browserHistory } from 'react-router'

export default function(state = {}, action) {
    const { type, payload } = action;

    switch (type) {

        case "STEP_0":
            browserHistory.push('/team/step1');
            return Object.assign({}, state, { email: action.createItem.data.email });
            break;

        default:
            return state;
            break;
    }
}