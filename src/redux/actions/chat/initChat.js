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
      const cachedLastChannelVisits = JSON.parse(
        localStorage.getItem("lastChannelVisits")
      );
      const cachedGuildOrder = JSON.parse(localStorage.getItem("guildOrder"));

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

      const lastChannelVisits = Object.fromEntries(
        Object.values(channels)
          .map(channel => Object.keys(channel))
          .flat()
          .map(channelId => [
            channelId,
            (cachedLastChannelVisits && cachedLastChannelVisits[channelId]) ||
              null
          ])
      );

      if (activeChannel) {
        lastChannelVisits[activeChannel] = new Date();
      }

      let guildIds = Object.keys(guilds);
      let guildOrder = cachedGuildOrder || [];
      let removeGuildIds = [];
      let addGuildIds = [];

      guildOrder.forEach(guildId => {
        if (!guildIds.includes(guildId)) {
          removeGuildIds.push(guildId);
        }
      });

      guildIds.forEach(guildId => {
        if (!guildOrder.includes(guildId)) {
          addGuildIds.push(guildId);
        }
      });

      guildOrder = guildOrder.filter(
        guildId => !removeGuildIds.includes(guildId)
      );
      guildOrder.push(...addGuildIds);

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
          lastChannelVisits,
          guildOrder
        }
      });
      dispatch(generalApiSuccess());
    } catch (error) {
      dispatch(generalApiError());
    }
  };
};

export default initChat;
