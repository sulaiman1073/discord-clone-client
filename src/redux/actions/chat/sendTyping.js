import * as api from "../../../helpers/api";
import { SET_SOCKET_BUSY } from "../../constants";

const sendTyping = () => {
  return async (dispatch, getState) => {
    try {
      const { activeGuild, activeChannels, socketBusy } = getState().chatState;

      if (socketBusy) return;

      dispatch({
        type: SET_SOCKET_BUSY,
        payload: { socketBusy: true }
      });

      await api.typing(activeGuild, activeChannels[activeGuild]);
    } catch (error) {
      dispatch({
        type: SET_SOCKET_BUSY,
        payload: { socketBusy: false }
      });
    }
  };
};

export default sendTyping;
