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
      return {
        ...state,
        email: action.email
      };

    case "STEP_1":
      return {
        ...state,
        code: action.code,
        email: action.email
      };

    case "STEP_2":
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case "STEP_3":
      return {
        ...state,
        password: action.password
      };

    case "STEP_4":
      return {
        ...state,
        companyName: action.companyName
      };

    default:
      return state;
  }
}
