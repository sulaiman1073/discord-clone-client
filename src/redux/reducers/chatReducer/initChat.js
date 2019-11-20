import _ from "lodash";

const initChat = (state, payload) => {
  if (payload.activeGuild) {
    localStorage.setItem("activeGuild", JSON.stringify(payload.activeGuild));
  }
  if (payload.activeChannels && !_.isEmpty(payload.activeChannels)) {
    localStorage.setItem(
      "activeChannels",
      JSON.stringify(payload.activeChannels)
    );
  }
  if (payload.drafts && !_.isEmpty(payload.drafts)) {
    localStorage.setItem("drafts", JSON.stringify(payload.drafts));
  }
  if (payload.channelsLastVisits && !_.isEmpty(payload.channelsLastVisits)) {
    localStorage.setItem(
      "channelsLastVisits",
      JSON.stringify(payload.channelsLastVisits)
    );
  }

  return {
    ...state,
    guilds: payload.guilds,
    members: payload.members,
    channels: payload.channels,
    messages: payload.messages,
    activeGuild: payload.activeGuild,
    activeChannels: payload.activeChannels,
    drafts: payload.drafts,
    channelsLastVisits: payload.channelsLastVisits,
    membersTyping: Object.fromEntries(
      Object.values(payload.channels)
        .map(channel => Object.keys(channel))
        .flat()
        .map(channelId => [channelId, []])
    ),
    lastTypes: Object.fromEntries(
      Object.values(payload.channels)
        .map(channel => Object.keys(channel))
        .flat()
        .map(channelId => [channelId, null])
    ),
    connected: true
  };
};

export default initChat;
