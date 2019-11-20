import * as api from "../../../helpers/api";
import { LOGOUT } from "../../constants";
import { closeModal } from "../modal";

const logout = () => {
  return async dispatch => {
    try {
      localStorage.removeItem("userState");
      await api.logout();
      dispatch({
        type: LOGOUT
      });
      dispatch(closeModal());
    } catch (error) {}
  };
};

export default logout;
