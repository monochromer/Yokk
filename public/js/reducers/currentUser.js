const defaultState = {
  role: "",
  login: "",
  companyId: ""
}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case "FETCH_CURRENT_USER":
      const currentUser = Object.assign({}, state, action.payload)
      return currentUser
      break

    case "CHANGE_CURRENT_COMPANY":
      const { companyId } = payload
      return Object.assign({}, state, {companyId: companyId})
      break

    case "UPDATE_USER":
      if (payload._id === state._id) {
        return Object.assign({}, state, payload);
      }

      return Object.assign({}, state);

    case "DELETE_PROFILE_IMG":
      const dummy = {
        small: "/img/dummy/960-720.png",
        medium: "/img/dummy/960-720.png",
        original: "/img/dummy/960-720.png"
      };

      return Object.assign({}, state, {
        profileImg: dummy
      });

    default:
      return state
  }
}
