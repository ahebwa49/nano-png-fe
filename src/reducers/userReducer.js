const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const defaultState = {
  username: ""
};
export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      const newState = Object.assign({}, defaultState, action.user);
      return newState;
      // eslint-disable-next-line
      break;

    case LOGOUT:
      return defaultState;
      // eslint-disable-next-line
      break;

    default:
      return state;
  }
};
