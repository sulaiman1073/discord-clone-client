import { SET_API } from "../../constants";

export const generalApiLoading = () => ({
  type: SET_API,
  payload: {
    generalApiLoading: true,
    generalApiError: false
  }
});

export const generalApiSuccess = () => ({
  type: SET_API,
  payload: {
    generalApiLoading: false,
    generalApiError: false
  }
});

export const generalApiError = () => ({
  type: SET_API,
  payload: {
    generalApiLoading: false,
    generalApiError: true
  }
});

export const userApiLoading = () => ({
  type: SET_API,
  payload: {
    userApiLoading: true,
    userApiError: false
  }
});

export const userApiSuccess = () => ({
  type: SET_API,
  payload: {
    userApiLoading: false,
    userApiError: false
  }
});

export const userApiError = error => ({
  type: SET_API,
  payload: {
    userApiLoading: false,
    userApiError: error || true
  }
});

export const chatApiLoading = () => ({
  type: SET_API,
  payload: {
    chatApiLoading: true,
    chatApiError: false
  }
});

export const chatApiSuccess = () => ({
  type: SET_API,
  payload: {
    chatApiLoading: false,
    chatApiError: false
  }
});

export const chatApiError = error => ({
  type: SET_API,
  payload: {
    chatApiLoading: false,
    chatApiError: error || true
  }
});
