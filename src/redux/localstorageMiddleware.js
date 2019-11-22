import {
  INIT_CHAT,
  GUILD_ADD,
  GUILD_DELETE,
  CHANNELS_UPDATE,
  MESSAGE_ADD,
  ADD_CHANNEL_MESSAGES,
  SET_ACTIVE_GUILD,
  SET_ACTIVE_CHANNEL,
  SET_DRAFT,
  SET_GUILD_ORDER
} from "./constants";

const localStorageMiddleware = () => store => next => action => {
  next(action);

  try {
    if (
      action.type === INIT_CHAT ||
      action.type === GUILD_ADD ||
      action.type === GUILD_DELETE
    ) {
      const {
        activeGuild,
        activeChannels,
        drafts,
        lastChannelVisits,
        guildOrder
      } = store.getState().chatState;

      localStorage.setItem("activeGuild", JSON.stringify(activeGuild));
      localStorage.setItem("activeChannels", JSON.stringify(activeChannels));
      localStorage.setItem("drafts", JSON.stringify(drafts));
      localStorage.setItem(
        "lastChannelVisits",
        JSON.stringify(lastChannelVisits)
      );
      localStorage.setItem("guildOrder", JSON.stringify(guildOrder));
    } else if (action.type === CHANNELS_UPDATE) {
      const { drafts, lastChannelVisits } = store.getState().chatState;

      localStorage.setItem("drafts", JSON.stringify(drafts));
      localStorage.setItem(
        "lastChannelVisits",
        JSON.stringify(lastChannelVisits)
      );
    } else if (action.type === MESSAGE_ADD) {
      const { lastChannelVisits } = store.getState().chatState;

      localStorage.setItem(
        "lastChannelVisits",
        JSON.stringify(lastChannelVisits)
      );
    } else if (action.type === ADD_CHANNEL_MESSAGES) {
      const {
        activeGuild,
        activeChannels,
        lastChannelVisits
      } = store.getState().chatState;

      localStorage.setItem("activeGuild", JSON.stringify(activeGuild));
      localStorage.setItem("activeChannels", JSON.stringify(activeChannels));
      localStorage.setItem(
        "lastChannelVisits",
        JSON.stringify(lastChannelVisits)
      );
    } else if (action.type === SET_ACTIVE_GUILD) {
      const { activeGuild } = store.getState().chatState;

      localStorage.setItem("activeGuild", JSON.stringify(activeGuild));
    } else if (action.type === SET_ACTIVE_CHANNEL) {
      const { activeChannels, lastChannelVisits } = store.getState().chatState;

      localStorage.setItem("activeChannels", JSON.stringify(activeChannels));
      localStorage.setItem(
        "lastChannelVisits",
        JSON.stringify(lastChannelVisits)
      );
    } else if (action.type === SET_DRAFT) {
      const { drafts } = store.getState().chatState;

      localStorage.setItem("drafts", JSON.stringify(drafts));
    } else if (action.type === SET_GUILD_ORDER) {
      const { guildOrder } = store.getState().chatState;

      localStorage.setItem("guildOrder", JSON.stringify(guildOrder));
    }
  } catch (err) {}
};

export default localStorageMiddleware;
