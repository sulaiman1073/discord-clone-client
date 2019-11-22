const setGuildOrder = (state, payload) => {
  return {
    ...state,
    guildOrder: payload.guildOrder
  };
};

export default setGuildOrder;
