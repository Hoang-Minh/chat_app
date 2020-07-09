import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export async function auth() {
  const { data } = await axios.get(`${USER_SERVER}/auth`);

  return {
    type: AUTH_USER,
    payload: data,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

// These two will be used after a refactoring using react-redux store !!!
export const loginUser1 = (dataToSubmit) => async (dispatch) => {
  const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
  dispatch({ type: LOGIN_USER, payload: response.data });
};

export const auth1 = () => async (dispatch) => {
  const response = await axios.get(`${USER_SERVER}/auth`);
  dispatch({ type: AUTH_USER, payload: response.data });
};
