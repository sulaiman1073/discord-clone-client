import * as api from "../../../helpers/api";
import { SET_USER_INFO } from "../../constants";

const login = loginInfo => {
  return async dispatch => {
    try {
      const response = await api.login(loginInfo);
      dispatch({
        type: SET_USER_INFO,
        payload: response.data
      });
      localStorage.setItem("userState", JSON.stringify(response.data));
    } catch (error) {}
  };
};

export default login;
