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

    default:
      return state
  }
}
