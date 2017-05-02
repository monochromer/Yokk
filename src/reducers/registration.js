import { browserHistory } from 'react-router'

var initialState = {
  email: "",
  companyId: "",
  firstName: "",
  lastName: "",
  companyName: "",
  code: ""
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case "STEP_0":
      browserHistory.push('/team/step1');
      return Object.assign({}, state, { email: payload.originatorEmail });

    case "STEP_1":
      browserHistory.push('/team/step2');
      return {
        ...state,
        companyId: payload._id,
        code: payload.confirmationCode
      };

    case "STEP_2":
      browserHistory.push('/team/step3');
      return Object.assign({}, state, {
        firstName: action.firstName,
        lastName: action.lastName
      });

    case "STEP_3":
      browserHistory.push('/team/step4');
      return Object.assign({}, state, { password: action.password });

    case "STEP_4":
      // browserHistory.push('/team/step5');
      setTimeout(() => { document.location.href = '/login'} , 0); // wtf !?
      return Object.assign({}, state, { teamName: action.teamName });

    default:
      return state;
  }
}
