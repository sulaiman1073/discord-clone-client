import * as api from "../../../helpers/api";
import { SET_FETCHING_MESSAGES, ADD_FETCHED_MESSAGES } from "../../constants";

const getMessages = () => {
  return async (dispatch, getState) => {
    try {
      const { activeGuild, activeChannels, messages } = getState().chatState;

      const beforeMessageId = messages[activeChannels[activeGuild]][0].id;

      dispatch({
        type: SET_FETCHING_MESSAGES,
        payload: { fetching: true }
      });

      const response = await api.getMessages(
        activeChannels[activeGuild],
        null,
        beforeMessageId
      );

      dispatch({
        type: ADD_FETCHED_MESSAGES,
        payload: {
          channelId: activeChannels[activeGuild],
          messages: response.data
        }
      });
    } catch (error) {}
  };
};

export default getMessages;
