import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REFRESH_TOKEN,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));
const INITIAL_STATE = user
  ? { isLoggedIn: true, user, errors: null }
  : { isLoggedIn: false, user: null, errors: null };

const authReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        errors: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        errors: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        errors: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        errors: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;

// const authReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     // case LOGIN_PENDING:
//     //   return {
//     //     ...state,
//     //     currentUser: {},
//     //     isAuthenticated: false,
//     //     loggedIn: false,
//     //   };

//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         currentUser: action.payload,
//         isAuthenticated: true,
//         loggedIn: true,
//       };
//     case LOGIN_ERROR:
//       return {
//         ...state,
//         currentUser: {},
//         isAuthenticated: false,
//         loggedIn: false,
//         errors: {
//           code: action.payload.response.status,
//           message: action.payload.response.data,
//           responseStatus: action.payload.response.statusText,
//         },
//       };

//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         currentUser: action.payload,
//         isAuthenticated: true,
//         loggedIn: true,
//       };
//     case REGISTER_ERROR:
//       return {
//         ...state,
//         currentUser: {},
//         isAuthenticated: false,
//         loggedIn: false,
//         errors: {
//           code: action.payload.response.status,
//           message: action.payload.response.data,
//           responseStatus: action.payload.response.statusText,
//         },
//       };
//     case LOGOUT_SUCCESS:
//       return {
//         ...INITIAL_STATE,
//         currentUser: action.payload,
//         isAuthenticated: false,
//         loggedIn: false,
//       };
//     case LOGOUT_ERROR:
//       return {
//         // ...state,
//         currentUser: {},
//         isAuthenticated: false,
//         loggedIn: false,
//         errors: {
//           code: action.payload.response.status,
//           message: action.payload.response.data,
//           responseStatus: action.payload.response.statusText,
//         },
//       };
//     case CLEAR_DATA:
//       return {
//         ...state,
//         currentUser: null,
//         isAuthenticated: null,
//         loggedIn: null,
//       };
//     default:
//       return state;
//   }
// };
// export default authReducer;
