const setFetchingMessages = (state, payload) => {
  return {
    ...state,
    fetchingMessages: payload.fetching
  };
};

export default setFetchingMessages;
