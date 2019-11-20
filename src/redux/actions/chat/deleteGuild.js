import { push } from "connected-react-router";
import * as api from "../../../helpers/api";
import { chatApiLoading, chatApiSuccess, chatApiError } from "../api";
import { closeModal } from "../modal";

const deleteGuild = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(chatApiLoading());

      const guildId = getState().chatState.activeGuild;

      await api.deleteGuild(guildId);

      dispatch(push("/"));

      dispatch(chatApiSuccess());
      dispatch(closeModal());
    } catch (error) {
      dispatch(chatApiError());
    }
  };
};

export default deleteGuild;
