import * as api from "../../../helpers/api";
import { SET_DRAFT } from "../../constants";

const sendMessage = () => {
  return async (dispatch, getState) => {
    try {
      const { activeGuild, activeChannels, drafts } = getState().chatState;

      await api.sendMessage({
        channelId: activeChannels[activeGuild],
        message: drafts[activeChannels[activeGuild]]
      });
      dispatch({
        type: SET_DRAFT,
        payload: { input: "" }
      });
    } catch (error) {}
  };
};

export default sendMessage;
