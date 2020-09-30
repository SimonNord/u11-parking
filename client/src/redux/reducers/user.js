import { LOGOUT_USER, SET_USER } from "../actionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user: user,
      };
    }
    case LOGOUT_USER: {
      localStorage.removeItem("user");
      return {
        user: null,
      };
    }
    default:
      return state;
  }
}
