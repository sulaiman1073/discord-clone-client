import uuidv4 from "uuid/v4";

const updateGuild = (state, payload) => {
  return {
    ...state,
    guilds: {
      ...state.guilds,
      [payload.guildId]: {
        ...state.guilds[payload.guildId],
        ...(payload.name && { name: payload.name }),
        ...(payload.icon !== undefined && {
          icon: payload.icon,
          updatedIcon: uuidv4()
        })
      }
    }
  };
};

export default updateGuild;
