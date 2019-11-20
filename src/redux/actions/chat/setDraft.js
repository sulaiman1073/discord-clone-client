import { SET_DRAFT } from "../../constants";
import sendTyping from "./sendTyping";

const setDraft = input => {
  return async (dispatch, getState) => {
    try {
      const { activeGuild, activeChannels, lastTypes } = getState().chatState;

      dispatch({
        type: SET_DRAFT,
        payload: { input }
      });

      if (
        !lastTypes[activeChannels[activeGuild]] ||
        (new Date() - lastTypes[activeChannels[activeGuild]]) / 1000 > 8
      ) {
        dispatch(sendTyping());
      }
    } catch (error) {}
  };
};

export default setDraft;
