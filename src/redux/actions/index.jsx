import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";

import { httpClient } from "../../httpClient/httpClient";
import AuthService from "../../services/auth";
import { toast } from "react-toastify";

/** Register */
export const register = (user) => {
  return (dispatch) => {
    httpClient
      .post(`/api/users/register`, user)
      .then((res) => {
        dispatch(successAction(REGISTER_SUCCESS, res.data));
        successToast("Registration Success");
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(failureAction(REGISTER_FAIL, message));
        errorToast(message);
      });
  };
};

/** Login */
export const login = (user) => {
  console.log(user);
  return (dispatch) => {
    httpClient
      .post(`/api/users/login`, user)
      .then((res) => {
        console.log(res);
        if (res.data.authToken) {
          AuthService.setUser(res.data);
        }
        dispatch(successAction(LOGIN_SUCCESS, res.data));
        successToast("Login Success! Welcome");
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(failureAction(LOGIN_FAIL, message));
        errorToast(message);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    httpClient
      .post(`/api/users/logout`)
      .then((res) => {
        console.log(res);
        AuthService.removeUser();
        dispatch(successAction(LOGOUT_SUCCESS, {}));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(failureAction(LOGOUT_FAIL, message));
        errorToast(message);
      });
  };
};

const successAction = (type, data) => {
  return {
    type: type,
    payload: data ? data : "",
  };
};
const failureAction = (type, message) => {
  return {
    type: type,
    payload: message ? message : "",
  };
};

/** Toastify */
const successToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
const errorToast = (message) => {
  toast.error("Error! " + message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
