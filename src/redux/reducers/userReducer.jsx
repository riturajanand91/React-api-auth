// import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER, GET_USER_BY_ID } from "../actions/types";
// const INITIAL_STATE = {
//   data: [],
//   // user: {},
//   loading: true,
//   loaded: false,
// };

// const userReducer = (state = INITIAL_STATE, action: any) => {
//   switch (action.type) {
//     case GET_USERS:
//       return {
//         ...state,
//         data: action.payload,
//         loading: false,
//         loaded: false,
//       };
//     case GET_USER_BY_ID:
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//         loaded: false,
//       };
//     case ADD_USER:
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//         loaded: true,
//       };
//     case UPDATE_USER:
//       return {
//         ...state,
//         loading: false,
//         user: action.payload,
//         loaded: true,
//       };
//     case DELETE_USER:
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//         loaded: true,
//       };
//     default:
//       return state;
//   }
// };
// export default userReducer;
