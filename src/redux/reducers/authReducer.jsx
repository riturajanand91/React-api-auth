import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, USER_LOADED, CLEAR_DATA } from "../actions/types";
let user = JSON.parse(localStorage.getItem("user"));

// const INITIAL_STATE = {
//   currentUser: user ? user : {},
//   isAuthenticated: user ? true : false,
//   loggedIn: user ? true : false,
//   errors: undefined,
// };
const INITIAL_STATE = {
  currentUser: {},
  isAuthenticated: false,
  loggedIn: false,
  errors: undefined,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case LOGIN_PENDING:
    //   return {
    //     ...state,
    //     currentUser: {},
    //     isAuthenticated: false,
    //     loggedIn: false,
    //   };

    case LOGIN_SUCCESS:
    case USER_LOADED:
      console.log(action);
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loggedIn: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        currentUser: {},
        isAuthenticated: false,
        loggedIn: false,
        errors: {
          code: action.payload.response.status,
          message: action.payload.response.data,
          responseStatus: action.payload.response.statusText,
        },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loggedIn: true,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        currentUser: {},
        isAuthenticated: false,
        loggedIn: false,
        errors: {
          code: action.payload.response.status,
          message: action.payload.response.data,
          responseStatus: action.payload.response.statusText,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        // ...state,
        currentUser: action.payload,
        isAuthenticated: false,
        loggedIn: false,
      };
    case LOGOUT_ERROR:
      return {
        // ...state,
        currentUser: {},
        isAuthenticated: false,
        loggedIn: false,
        errors: {
          code: action.payload.response.status,
          message: action.payload.response.data,
          responseStatus: action.payload.response.statusText,
        },
      };
    case CLEAR_DATA:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: null,
        loggedIn: null,
      };
    default:
      return state;
  }
};
export default authReducer;
