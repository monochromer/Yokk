import { browserHistory } from 'react-router'

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
            const { email } = action.createItem.data;

            if(!localStorage.getItem('team_email')) {
                localStorage.setItem('team_email', email) ;
            }

            browserHistory.push('/team/step1');
            return Object.assign({}, state, { email: email });

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
            return Object.assign({}, state, { team: payload._id });
            break;

        case "STEP_2":
            browserHistory.push('/team/step3');
            return Object.assign({}, state, { login: action.login });
            break;

        case "STEP_3":
            browserHistory.push('/team/step4');
            return Object.assign({}, state, { password: action.password });
            break;

        case "STEP_4":
            browserHistory.push('/team/step5');
            return Object.assign({}, state, { teamName: action.teamName });
            break;

        case "STEP_5":
            return state;
            break;

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