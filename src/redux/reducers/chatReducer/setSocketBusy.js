const setSocketBusy = (state, payload) => {
  return {
    ...state,
    socketBusy: payload.socketBusy
  };
};

export default setSocketBusy;
