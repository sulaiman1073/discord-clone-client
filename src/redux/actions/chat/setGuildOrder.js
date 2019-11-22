import { SET_GUILD_ORDER } from "../../constants";

const setGuildOrder = guildOrder => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_GUILD_ORDER,
        payload: {
          guildOrder: guildOrder
        }
      });
    } catch (error) {}
  };
};

export default setGuildOrder;
