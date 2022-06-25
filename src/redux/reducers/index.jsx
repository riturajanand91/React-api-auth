import { combineReducers } from "redux";
// import usersReducer from "./userReducer";
import authReducer from "./authReducer";

export default combineReducers({
  // key name users will show up in our state
  auth: authReducer,
  // users: usersReducer
});
