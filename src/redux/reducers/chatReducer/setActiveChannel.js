const setActiveChannel = (state, payload) => {
  return {
    ...state,
    activeChannels: {
      ...state.activeChannels,
      [state.activeGuild]: payload.channelId
    },
    lastChannelVisits: {
      ...state.lastChannelVisits,
      [payload.channelId]: new Date()
    }
  };
};

export default setActiveChannel;
