const addMemberTyping = (state, payload) => {
  return {
    ...state,
    ...(payload.clientUserId !== payload.userId &&
      !state.membersTyping[payload.channelId].includes(payload.userId) && {
        membersTyping: {
          ...state.membersTyping,
          [payload.channelId]: [
            ...state.membersTyping[payload.channelId],
            payload.userId
          ]
        }
      }),
    ...(payload.clientUserId === payload.userId && {
      lastTypes: {
        ...state.lastTypes,
        [payload.channelId]: new Date()
      }
    }),
    socketBusy: false
  };
};

export default addMemberTyping;
