const addChannelMessages = (state, payload) => {
  if (payload.guildId) {
    localStorage.setItem("activeGuild", JSON.stringify(payload.guildId));
  }

  localStorage.setItem(
    "activeChannels",
    JSON.stringify({
      ...state.activeChannels,
      [payload.guildId ? payload.guildId : state.activeGuild]: payload.channelId
    })
  );

  localStorage.setItem(
    "channelsLastVisits",
    JSON.stringify({
      ...state.channelsLastVisits,
      [payload.channelId]: new Date()
    })
  );

  const sliceValue =
    state.messages[payload.channelId].length < 50
      ? -(50 - state.messages[payload.channelId].length)
      : payload.messages.length;

  return {
    ...state,
    messages: {
      ...state.messages,
      [payload.channelId]: [
        ...payload.messages.slice(sliceValue),
        ...state.messages[payload.channelId]
      ]
    },
    ...(payload.guildId && {
      activeGuild: payload.guildId
    }),
    activeChannels: {
      ...state.activeChannels,
      [payload.guildId ? payload.guildId : state.activeGuild]: payload.channelId
    },
    channelsLastVisits: {
      ...state.channelsLastVisits,
      [payload.channelId]: new Date()
    }
  };
};

export default addChannelMessages;
