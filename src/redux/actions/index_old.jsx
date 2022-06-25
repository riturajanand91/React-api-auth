// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   SET_MESSAGE,
//   REFRESH_TOKEN,
// } from "./types";
// import { httpClient } from "../../httpClient/httpClient";
// import moment from "moment";

// /** Login Actions */
// export const loginUser = (user) => {
//   return (dispatch) => {
//     // dispatch(loginPending(user));
//     httpClient
//       .post(`/api/users/login`, user)
//       .then((res) => {
//         // console.log(res);
//         // console.log(res.data);
//         setToken(res.data.authToken);
//         setUser(res.data);
//         dispatch(loginSuccess(res.data));
//       })
//       .catch((error) => dispatch(loginError(error)));
//   };
// };

// // const loginPending = (credentials: any) => {
// //   return {
// //     type: LOGIN_PENDING,
// //     credentials,
// //   };
// // };
// const loginSuccess = (user) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: user,
//   };
// };
// const loginError = (error) => {
//   return {
//     type: LOGIN_ERROR,
//     payload: error,
//   };
// };

// const setToken = (token) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("lastLoginTime", moment().format());
// };
// const setUser = (user) => {
//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("isAuthenticated", "true");
// };
// const removeToken = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("lastLoginTime");
// };
// const removeUser = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("isAuthenticated");
// };
// /** Sign Up Actions */

// export const registerUser = (user) => {
//   return (dispatch) => {
//     httpClient
//       .post(`/api/users/register`, user)
//       .then((res) => {
//         console.log(res);
//         dispatch(registerSuccess(res.data));
//       })
//       .catch((error) => dispatch(registerError(error)));
//   };
// };

// const registerSuccess = (users) => ({
//   type: REGISTER_SUCCESS,
//   payload: users,
// });
// const registerError = (error) => {
//   return {
//     type: REGISTER_ERROR,
//     payload: error,
//   };
// };

// export const logOutUser = () => {
//   return (dispatch) => {
//     httpClient
//       .post(`/api/users/logout`)
//       .then((res) => {
//         removeToken();
//         removeUser();
//         dispatch(logOutSuccess(res.data));
//         // dispatch({
//         //   type: CLEAR_DATA,
//         // });
//       })
//       .catch((error) => dispatch(logoutError(error)));
//   };
// };

// const logOutSuccess = (users) => {
//   return {
//     type: LOGOUT_SUCCESS,
//     payload: users,
//   };
// };
// const logoutError = (error) => {
//   return {
//     type: LOGOUT_ERROR,
//     payload: error,
//   };
// };

// export const loadUser = () => {
//   return (dispatch, getState) => {
//     console.log(getState());
//     const token = getState().auth.token;
//     if (token) {
//       dispatch({
//         type: USER_LOADED,
//         token,
//       });
//     } else return null;
//   };
// };
// // export const clearData = () => {
// //   return (dispatch, getState) => {
// //     dispatch({
// //       type: CLEAR_DATA,
// //     });
// //   };
// // };
