const addGuild = (state, payload) => {
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
    lastChannelVisits: {
      ...state.lastChannelVisits,
      [payload.channelId]: new Date()
    },
    guildOrder: [...state.guildOrder, payload.guildId]
  };
};

export default addGuild;
