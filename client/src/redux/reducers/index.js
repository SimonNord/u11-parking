import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import user from "./user";

export default combineReducers({ user, visibilityFilter });
