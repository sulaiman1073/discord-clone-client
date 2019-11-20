const addFetchedMessages = (state, payload) => {
  return {
    ...state,
    messages: {
      ...state.messages,
      [payload.channelId]: [
        ...payload.messages,
        ...state.messages[payload.channelId]
      ]
    },
    fetchingMessages: false
  };
};

export default addFetchedMessages;
