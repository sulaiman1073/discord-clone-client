import * as api from "../../../helpers/api";
import { INIT_CHAT } from "../../constants";
import { generalApiLoading, generalApiSuccess, generalApiError } from "../api";

const initChat = () => {
  return async dispatch => {
    try {
      const cachedActiveGuild = JSON.parse(localStorage.getItem("activeGuild"));
      const cachedActiveChannels = JSON.parse(
        localStorage.getItem("activeChannels")
      );
      const cachedDrafts = JSON.parse(localStorage.getItem("drafts"));
      const cachedChannelsLastVisits = JSON.parse(
        localStorage.getItem("channelsLastVisits")
      );

      let response;
      dispatch(generalApiLoading());
      if (cachedActiveGuild && cachedActiveChannels) {
        response = await api.initChat(cachedActiveChannels[cachedActiveGuild]);
      } else {
        response = await api.initChat();
      }

      const {
        guilds,
        channels,
        members,
        messages,
        activeChannel,
        activeGuild
      } = response.data;

      const activeChannels = {};

      Object.keys(guilds).forEach(guildId => {
        if (!activeChannels[guildId]) activeChannels[guildId] = {};

        if (guildId === activeGuild) activeChannels[guildId] = activeChannel;
        else if (
          cachedActiveChannels &&
          channels[guildId][cachedActiveChannels[guildId]]
        ) {
          activeChannels[guildId] = cachedActiveChannels[guildId];
        } else if (channels[guildId]) {
          [activeChannels[guildId]] = Object.keys(channels[guildId]);
        }
      });

      const drafts = Object.fromEntries(
        Object.values(channels)
          .map(channel => Object.keys(channel))
          .flat()
          .map(channelId => [
            channelId,
            (cachedDrafts && cachedDrafts[channelId]) || ""
          ])
      );

      const channelsLastVisits = Object.fromEntries(
        Object.values(channels)
          .map(channel => Object.keys(channel))
          .flat()
          .map(channelId => [
            channelId,
            (cachedChannelsLastVisits && cachedChannelsLastVisits[channelId]) ||
              null
          ])
      );

      if (activeChannel) {
        channelsLastVisits[activeChannel] = new Date();
      }

      dispatch({
        type: INIT_CHAT,
        payload: {
          guilds,
          channels,
          members,
          messages,
          activeGuild,
          activeChannel,
          activeChannels,
          drafts,
          channelsLastVisits
        }
      });
      dispatch(generalApiSuccess());
    } catch (error) {
      dispatch(generalApiError());
    }
  };
};

export default initChat;
