import * as api from "../../../helpers/api";
import { ADD_CHANNEL_MESSAGES, SET_ACTIVE_GUILD } from "../../constants";

const setActiveGuild = guildId => {
  return async (dispatch, getState) => {
    try {
      const { activeChannels, channels, messages } = getState().chatState;

      const channelId = activeChannels[guildId];

      if (
        channels[guildId][channelId].firstMessageId &&
        messages[channelId].length === 0
      ) {
        const response = await api.getMessages(channelId);
        dispatch({
          type: ADD_CHANNEL_MESSAGES,
          payload: {
            guildId,
            channelId,
            messages: response.data
          }
        });
      } else if (
        channels[guildId][channelId].firstMessageId &&
        channels[guildId][channelId].firstMessageId !==
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
            guildId,
            channelId,
            messages: response.data
          }
        });
      } else {
        dispatch({
          type: SET_ACTIVE_GUILD,
          payload: { guildId }
        });
      }
    } catch (error) {}
  };
};

export default setActiveGuild;
