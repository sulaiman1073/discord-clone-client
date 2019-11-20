import * as api from "../../../helpers/api";
import { GUILD_ADD } from "../../constants";
import { chatApiLoading, chatApiSuccess, chatApiError } from "../api";
import { closeModal } from "../modal";

const joinGuild = inviteCode => {
  return async dispatch => {
    try {
      dispatch(chatApiLoading());

      const response = await api.joinGuild(inviteCode);

      dispatch({
        type: GUILD_ADD,
        payload: response.data
      });

      dispatch(chatApiSuccess());
      dispatch(closeModal());
    } catch (error) {
      if (error.response) {
        dispatch(chatApiError(error.response.data.message));
      } else {
        dispatch(chatApiError());
      }
    }
  };
};

export default joinGuild;
