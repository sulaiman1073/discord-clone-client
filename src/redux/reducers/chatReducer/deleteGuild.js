import _ from "lodash";

const deleteGuild = (state, payload) => {
  const removedChannels = Object.keys(state.channels[payload.guildId]).map(
    c => `[${c}]`
  );

  const newActiveGuild =
    state.activeGuild !== payload.guildId
      ? state.activeGuild
      : Object.keys(state.guilds).filter(g => g !== payload.guildId)[0];

  const newActiveChannels = _.omit(
    state.activeChannels,
    `[${payload.guildId}]`
  );
  const newDrafts = _.omit(state.drafts, removedChannels);
  const newChannelsLastVisits = _.omit(
    state.channelsLastVisits,
    removedChannels
  );

  localStorage.setItem("activeGuild", JSON.stringify(newActiveGuild));
  localStorage.setItem("activeChannels", JSON.stringify(newActiveChannels));
  localStorage.setItem("drafts", JSON.stringify(newDrafts));
  localStorage.setItem(
    "channelsLastVisits",
    JSON.stringify(newChannelsLastVisits)
  );

  return {
    ...state,
    guilds: _.omit(state.guilds, `[${payload.guildId}]`),
    members: _.omit(state.members, `[${payload.guildId}]`),
    channels: _.omit(state.channels, `[${payload.guildId}]`),
    messages: _.omit(state.messages, removedChannels),
    activeGuild: newActiveGuild,
    activeChannels: newActiveChannels,
    drafts: newDrafts,
    membersTyping: _.omit(state.membersTyping, removedChannels),
    lastTypes: _.omit(state.lastTypes, removedChannels),
    channelsLastVisits: newChannelsLastVisits
  };
};

export default deleteGuild;
