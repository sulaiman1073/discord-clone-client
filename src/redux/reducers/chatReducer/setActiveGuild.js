const setActiveGuild = (state, payload) => {
  return {
    ...state,
    activeGuild: payload.guildId
  };
};

export default setActiveGuild;
