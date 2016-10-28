import { browserHistory } from 'react-router'

export default function(state = {}, action) {
    const { type, payload } = action;

    switch (type) {

        case "STEP_0":
            browserHistory.push('/team/step1');
            return Object.assign({}, state, { email: action.createItem.data.email });
            break;

        case "STEP_0_FAIL":
            console.log(action.error);
            return state;
            break;

        case "STEP_1":
            browserHistory.push('/team/step2');
            return Object.assign({}, state, { team: payload._id });
            break;

        case "STEP_2":
            browserHistory.push('/team/step3');
            return Object.assign({}, state, { login: action.login });
            break;

        case "STEP_3":
            browserHistory.push('/team/step4');
            return state;
            break;

        case "STEP_4":
            browserHistory.push('/team/step5');
            return Object.assign({}, state, { teamName: action.teamName });
            break;

        default:
            return state;
            break;
    }
}