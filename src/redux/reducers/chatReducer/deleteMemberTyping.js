const deleteMemberTyping = (state, payload) => {
  if (!state.membersTyping[payload.channelId]) {
    return { ...state };
  }

  return {
    ...state,
    membersTyping: {
      ...state.membersTyping,
      [payload.channelId]: state.membersTyping[payload.channelId].filter(
        memberId => memberId !== payload.userId
      )
    }
  };
};

export default deleteMemberTyping;
