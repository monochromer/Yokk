var initialState = {
  email: localStorage.reg_email || "",
  code: localStorage.reg_code || "",
  firstName: localStorage.reg_firstName || "",
  lastName: localStorage.reg_lastName || "",
  password: localStorage.reg_password || "",
  companyName: localStorage.reg_companyName || "",
  timerStart: +localStorage.reg_timerStart || 0
};

export default function(state = initialState, action) {

  switch (action.type) {

    case "STEP_0":
      localStorage.reg_email = action.email;
      localStorage.reg_timerStart = Date.now();
      localStorage.reg_code = "";
      return {
        ...state,
        email: action.email,
        code: "",
        timerStart: Date.now()
      };

    case "STEP_1":
      localStorage.reg_code = action.code;
      localStorage.reg_email = action.email;
      return {
        ...state,
        code: action.code,
        email: action.email
      };

    case "STEP_2":
      localStorage.reg_firstName = action.firstName;
      localStorage.reg_lastName = action.lastName;
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case "STEP_3":
      localStorage.reg_password = action.password;
      return {
        ...state,
        password: action.password
      };

    case "STEP_4":
      localStorage.reg_companyName = action.companyName;
      return {
        ...state,
        companyName: action.companyName
      };

    case "STEP_5":
      localStorage.removeItem('reg_email');
      localStorage.removeItem('reg_code');
      localStorage.removeItem('reg_firstName');
      localStorage.removeItem('reg_lastName');
      localStorage.removeItem('reg_password');
      localStorage.removeItem('reg_companyName');
      localStorage.removeItem('reg_timerStart');
      return initialState;

    default:
      return state;
  }
}
