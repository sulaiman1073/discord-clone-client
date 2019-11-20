import * as api from "../../../helpers/api";
import { USER_UPDATE } from "../../constants";

const setStatus = status => {
  return async dispatch => {
    try {
      const response = await api.updateUser({ status });

      dispatch({
        type: USER_UPDATE,
        payload: { status: response.data.status }
      });
    } catch (error) {}
  };
};

export default setStatus;
