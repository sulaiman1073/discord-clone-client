import _ from "lodash";
import * as api from "../../../helpers/api";
import { USER_UPDATE } from "../../constants";
import { userApiLoading, userApiSuccess, userApiError } from "../api";

const updateUser = updateInfo => {
  return async (dispatch, getState) => {
    try {
      dispatch(userApiLoading());

      const { username, email, avatar } = getState().userState;

      const formData = new FormData();

      if (updateInfo.username && updateInfo.username !== username) {
        formData.append("username", updateInfo.username);
      }
      if (updateInfo.email && updateInfo.email !== email) {
        formData.append("email", updateInfo.email);
      }
      if (updateInfo.avatar) {
        formData.append("avatar", updateInfo.avatar);
      }
      if (updateInfo.password) {
        formData.append("password", updateInfo.password);
      }
      if (updateInfo.newPassword) {
        formData.append("newPassword", updateInfo.newPassword);
      }
      if (updateInfo.removeAvatar && avatar) {
        formData.append("removeAvatar", true);
      }

      const formObject = Object.fromEntries(formData);

      if (
        _.isEmpty(formObject) ||
        (!formObject.username &&
          !formObject.email &&
          !formObject.avatar &&
          !formObject.removeAvatar)
      ) {
        dispatch(userApiSuccess());
        return;
      }

      const response = await api.updateUser(formData);

      dispatch({
        type: USER_UPDATE,
        payload: response.data
      });

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

export default updateUser;
