const initChat = (state, payload) => {
  return {
    ...state,
    guilds: payload.guilds,
    members: payload.members,
    channels: payload.channels,
    messages: payload.messages,
    activeGuild: payload.activeGuild,
    activeChannels: payload.activeChannels,
    drafts: payload.drafts,
    lastChannelVisits: payload.lastChannelVisits,
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
    guildOrder: payload.guildOrder
  };
};

export default initChat;
