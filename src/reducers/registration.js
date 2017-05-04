import { browserHistory } from 'react-router'

var initialState = {
  email: "",
  companyId: "",
  companyName: "",
  code: "",
  firstName: "",
  lastName: "",
  userId: "",
  teamId: ""
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case "STEP_0":
      browserHistory.push('/registration/step1');
      return {
        ...state,
        email: payload.originatorEmail
      };

    case "STEP_1":
      browserHistory.push('/registration/step2');
      return {
        ...state,
        companyId: payload._id,
        code: payload.confirmationCode
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
        userId: payload.userId,
        teamId: payload.teamId
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
