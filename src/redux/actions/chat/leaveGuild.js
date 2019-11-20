import * as api from "../../../helpers/api";
import { GUILD_DELETE } from "../../constants";
import { chatApiLoading, chatApiSuccess, chatApiError } from "../api";
import { closeModal } from "../modal";
import setActiveChannel from "./setActiveChannel";

const leaveGuild = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(chatApiLoading());

      const guildId = getState().chatState.activeGuild;

      await api.leaveGuild(guildId);

      dispatch({
        type: GUILD_DELETE,
        payload: { guildId }
      });

      const { activeGuild, activeChannels } = getState().chatState;

      dispatch(setActiveChannel(activeChannels[activeGuild]));
      dispatch(chatApiSuccess());
      dispatch(closeModal());
    } catch (error) {
      dispatch(chatApiError());
    }
  };
};

export default leaveGuild;
