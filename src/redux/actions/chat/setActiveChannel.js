import * as api from "../../../helpers/api";
import { ADD_CHANNEL_MESSAGES, SET_ACTIVE_CHANNEL } from "../../constants";

const setActiveChannel = channelId => {
  return async (dispatch, getState) => {
    try {
      const { activeGuild, channels, messages } = getState().chatState;

      if (
        channels[activeGuild][channelId].firstMessageId &&
        messages[channelId].length === 0
      ) {
        const response = await api.getMessages(channelId);
        dispatch({
          type: ADD_CHANNEL_MESSAGES,
          payload: {
            channelId,
            messages: response.data
          }
        });
      } else if (
        channels[activeGuild][channelId].firstMessageId &&
        channels[activeGuild][channelId].firstMessageId !==
          messages[channelId][0].id &&
        messages[channelId].length <= 40
      ) {
        const response = await api.getMessages(
          channelId,
          null,
          messages[channelId][0].id
        );
        dispatch({
          type: ADD_CHANNEL_MESSAGES,
          payload: {
            channelId,
            messages: response.data
          }
        });
      } else {
        dispatch({
          type: SET_ACTIVE_CHANNEL,
          payload: { channelId }
        });
      }
    } catch (error) {}
  };
};

export default setActiveChannel;
