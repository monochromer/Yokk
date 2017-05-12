import { browserHistory } from 'react-router'

var initialState = {
  email: "",
  code: "",
  firstName: "",
  lastName: "",
  password: "",
  companyName: ""
};

export default function(state = initialState, action) {

  switch (action.type) {

    case "STEP_0":
      browserHistory.push('/registration/step1');
      return {
        ...state,
        email: action.email
      };

    case "STEP_1":
      browserHistory.push('/registration/step2');
      return {
        ...state,
        code: action.code,
        email: action.email
      };

    case "STEP_2":
      browserHistory.push('/registration/step3');
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case "STEP_3":
      browserHistory.push('/registration/step4');
      return {
        ...state,
        password: action.password
      };

    case "STEP_4":
      browserHistory.push('/registration/step5');
      return {
        ...state,
        companyName: action.companyName
      };

    default:
      return state;
  }
}
