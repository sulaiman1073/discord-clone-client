import _ from "lodash";

const updateChannels = (state, payload) => {
  // localStorage.setItem("activeGuild", JSON.stringify(payload.guildId));

  const channelIds1 = Object.keys(state.channels[payload.guildId]);
  const channelIds2 = Object.keys(payload.channels[payload.guildId]);
  const newChannelsIds = _.difference(channelIds2, channelIds1);
  const newMessages = Object.fromEntries(
    newChannelsIds.map(channelId => [channelId, []])
  );
  const newDrafts = Object.fromEntries(
    newChannelsIds.map(channelId => [channelId, ""])
  );
  const newChannelsLastVisits = Object.fromEntries(
    newChannelsIds.map(channelId => [channelId, null])
  );

  return {
    ...state,
    channels: { ...state.channels, ...payload.channels },
    ...(!Object.keys(payload.channels[payload.guildId]).includes(
      state.activeChannels[payload.guildId]
    ) && {
      activeChannels: {
        ...state.activeChannels,
        [payload.guildId]: Object.keys(payload.channels[payload.guildId])[0]
      }
    }),
    ...(!_.isEmpty(newMessages) && {
      messages: {
        ...state.messages,
        ...newMessages
      }
    }),
    ...(!_.isEmpty(newDrafts) && {
      drafts: {
        ...state.drafts,
        ...newDrafts
      }
    }),
    ...(!_.isEmpty(newChannelsLastVisits) && {
      newChannelsLastVisits: {
        ...state.channelsLastVisits,
        ...newChannelsLastVisits
      }
    }),
    ...(!_.isEmpty(newMessages) && {
      membersTyping: {
        ...state.membersTyping,
        ...newMessages
      }
    }),
    ...(!_.isEmpty(newChannelsLastVisits) && {
      lastTypes: {
        ...state.lastTypes,
        ...newChannelsLastVisits
      }
    })
  };
};

export default updateChannels;
