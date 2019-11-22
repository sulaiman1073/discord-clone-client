const addChannelMessages = (state, payload) => {
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
    lastChannelVisits: {
      ...state.lastChannelVisits,
      [payload.channelId]: new Date()
    }
  };
};

export default addChannelMessages;
