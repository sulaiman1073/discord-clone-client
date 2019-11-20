const updateGuild = (state, payload) => {
  return {
    ...state,
    guilds: {
      ...state.guilds,
      [payload.guildId]: {
        ...state.guilds[payload.guildId],
        ...(payload.name && { name: payload.name }),
        ...(payload.icon && { icon: payload.icon })
      }
    }
  };
};

export default updateGuild;
