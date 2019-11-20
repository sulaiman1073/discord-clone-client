import _ from "lodash";
import * as api from "../../../helpers/api";
import { chatApiLoading, chatApiSuccess, chatApiError } from "../api";

const updateGuild = guildInfo => {
  return async (dispatch, getState) => {
    try {
      dispatch(chatApiLoading());

      const { guilds, activeGuild: guildId } = getState().chatState;

      const guildName = guilds[guildId].name;
      const guildIcon = guilds[guildId].icon;

      const formData = new FormData();

      if (guildInfo.name && guildInfo.name !== guildName) {
        formData.append("name", guildInfo.name);
      }
      if (guildInfo.icon) {
        formData.append("icon", guildInfo.icon);
      }
      if (guildInfo.removeIcon && guildIcon) {
        formData.append("removeIcon", true);
      }

      const formObject = Object.fromEntries(formData);

      if (
        _.isEmpty(formObject) ||
        (!formObject.name && !formObject.icon && !formObject.removeIcon)
      ) {
        dispatch(chatApiSuccess());
        return;
      }

      await api.updateGuild(guildId, formData);

      dispatch(chatApiSuccess());
    } catch (error) {
      console.log("ERRR", error);
      dispatch(chatApiError());
    }
  };
};

export default updateGuild;
