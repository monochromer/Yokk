import { browserHistory } from 'react-router'
import {FETCH_TEAMS} from  '../constants'

var initialState = {
    email: "",
    team: "",
    login: "",
    teamName: "",
    errors: {
        step0: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload, step, text } = action;

    switch (type) {

        case "STEP_0":
            localStorage.setItem('email', action.createItem.data.email);
            browserHistory.push('/team/step1');
            return Object.assign({}, state, { email: action.createItem.data.email });
            break;

        case "STEP_0_FAIL":
            console.log(action.error);
            return Object.assign({}, state,
                {
                    errors:  {
                        step0: action.error
                    }
                });
            break;

        case "STEP_1":
            browserHistory.push('/team/step2');
            localStorage.setItem('_id', payload._id);
            return Object.assign({}, state, { team: payload._id });
            break;

        case "STEP_2":
            browserHistory.push('/team/step3');
            localStorage.setItem('login', action.login);
            return Object.assign({}, state, { login: action.login });
            break;

        case "STEP_3":
            browserHistory.push('/team/step4');
            localStorage.setItem('password', action.password);
            return Object.assign({}, state, { password: action.password });
            break;

        case "STEP_4":
            // browserHistory.push('/team/step5');
            setTimeout(() => { document.location.href = '/login'} , 0); // wtf !?
            localStorage.setItem('teamName', action.teamName);
            return Object.assign({}, state, { teamName: action.teamName });
            break;

        // case "STEP_5":
        //     return state;
        //     break;

        case "REMOVE_ERRORS":
            return Object.assign({}, state,
                {
                    errors: {
                        step0: ""
                    }
                });
            break;

        case "CREATE_ERROR": {
            return Object.assign({}, state, {
                errors: {
                    [step]: text
                }
            });
        }

        default:
            return state;
            break;
    }
}
