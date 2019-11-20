import * as api from "../../../helpers/api";
import { chatApiLoading, chatApiSuccess, chatApiError } from "../api";

const updateChannels = channelsInfo => {
  return async (dispatch, getState) => {
    try {
      const { activeGuild } = getState().chatState;

      dispatch(chatApiLoading());

      await api.updateChannels(activeGuild, channelsInfo);

      dispatch(chatApiSuccess());
    } catch (error) {
      dispatch(chatApiError());
    }
  };
};

export default updateChannels;
