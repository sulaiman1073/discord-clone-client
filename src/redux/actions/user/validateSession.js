import * as api from "../../../helpers/api";
import { SET_USER_INFO } from "../../constants";

const validateSession = () => {
  return async dispatch => {
    try {
      const cachedUserState = JSON.parse(localStorage.getItem("userState"));

      if (cachedUserState) {
        dispatch({
          type: SET_USER_INFO,
          payload: cachedUserState
        });
      }
      const response = await api.validateSession();
      dispatch({
        type: SET_USER_INFO,
        payload: response.data
      });
      localStorage.setItem("userState", JSON.stringify(response.data));
    } catch (error) {
      localStorage.removeItem("userState");
    }
  };
};

export default validateSession;
