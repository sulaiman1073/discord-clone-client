import * as api from "../../../helpers/api";
import { SET_USER_INFO } from "../../constants";
import { userApiLoading, userApiSuccess, userApiError } from "../api";

const register = registerInfo => {
  return async dispatch => {
    try {
      dispatch(userApiLoading());
      const response = await api.register(registerInfo);

      await api.login({
        email: registerInfo.email,
        password: registerInfo.password
      });

      dispatch({
        type: SET_USER_INFO,
        payload: response.data
      });

      localStorage.setItem("userState", JSON.stringify(response.data));
      dispatch(userApiSuccess());
    } catch (error) {
      if (error.response) {
        dispatch(userApiError(error.response.data.message));
      } else {
        dispatch(userApiError());
      }
    }
  };
};

export default register;
