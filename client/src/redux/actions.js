import { LOGOUT_USER, SET_USER } from './actionTypes';

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

export const logOutUser = (user) => ({
  type: LOGOUT_USER,
  payload: { user },
});
