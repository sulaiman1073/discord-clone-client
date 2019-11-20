const addGuild = (state, payload) => {
  localStorage.setItem("activeGuild", JSON.stringify(payload.guildId));
  localStorage.setItem(
    "activeChannels",
    JSON.stringify({
      ...state.activeChannels,
      [payload.guildId]: payload.channelId
    })
  );
  localStorage.setItem(
    "drafts",
    JSON.stringify({
      ...state.drafts,
      [payload.channelId]: ""
    })
  );
  localStorage.setItem(
    "channelsLastVisits",
    JSON.stringify({
      ...state.channelsLastVisits,
      [payload.channelId]: new Date()
    })
  );

  return {
    ...state,
    guilds: {
      ...state.guilds,
      ...payload.guilds
    },
    members: {
      ...state.members,
      ...payload.members
    },
    channels: {
      ...state.channels,
      ...payload.channels
    },
    messages: {
      ...state.messages,
      ...payload.messages
    },
    activeGuild: payload.guildId,
    activeChannels: {
      ...state.activeChannels,
      [payload.guildId]: payload.channelId
    },
    drafts: {
      ...state.drafts,
      [payload.channelId]: ""
    },
    membersTyping: {
      ...state.membersTyping,
      [payload.channelId]: []
    },
    lastTypes: {
      ...state.lastTypes,
      [payload.channelId]: null
    },
    channelsLastVisits: {
      ...state.channelsLastVisits,
      [payload.channelId]: new Date()
    }
  };
};

export default addGuild;
