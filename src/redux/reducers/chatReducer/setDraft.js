const setDraft = (state, payload) => {
  return {
    ...state,
    drafts: {
      ...state.drafts,
      [state.activeChannels[state.activeGuild]]: payload.input
    }
  };
};

export default setDraft;
