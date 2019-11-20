import { SET_WS } from "../constants";

const initialState = {
  connected: null,
  heartbeatInterval: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
