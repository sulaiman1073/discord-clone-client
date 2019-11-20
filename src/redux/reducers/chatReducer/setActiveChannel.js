const setActiveChannel = (state, payload) => {
  localStorage.setItem(
    "activeChannels",
    JSON.stringify({
      ...state.activeChannels,
      [state.activeGuild]: payload.channelId
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
    activeChannels: {
      ...state.activeChannels,
      [state.activeGuild]: payload.channelId
    },
    channelsLastVisits: {
      ...state.channelsLastVisits,
      [payload.channelId]: new Date()
    }
  };
};

export default setActiveChannel;
