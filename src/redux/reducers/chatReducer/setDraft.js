const setDraft = (state, payload) => {
  localStorage.setItem(
    "drafts",
    JSON.stringify({
      ...state.drafts,
      [state.activeChannels[state.activeGuild]]: payload.input
    })
  );

  return {
    ...state,
    drafts: {
      ...state.drafts,
      [state.activeChannels[state.activeGuild]]: payload.input
    }
  };
};

export default setDraft;
