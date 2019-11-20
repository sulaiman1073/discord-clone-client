const setActiveGuild = (state, payload) => {
  localStorage.setItem("activeGuild", JSON.stringify(payload.guildId));

  return {
    ...state,
    activeGuild: payload.guildId
  };
};

export default setActiveGuild;
