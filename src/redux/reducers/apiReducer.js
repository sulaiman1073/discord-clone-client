import { SET_API } from "../constants";

const initialState = {
  generalApiLoading: false,
  generalApiError: false,
  userApiLoading: false,
  userApiError: false,
  chatApiLoading: false,
  chatApiError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_API:
      return { ...state, ...payload };

    default:
      return state;
  }
};
