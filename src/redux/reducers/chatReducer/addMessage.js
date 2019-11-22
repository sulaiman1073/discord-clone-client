const addMessage = (state, payload) => {
  return {
    ...state,
    messages: {
      ...state.messages,
      [payload.channelId]:
        state.messages[payload.channelId].length >= 50
          ? [
              ...state.messages[payload.channelId].slice(
                1,
                state.messages[payload.channelId].length
              ),
              payload.message
            ]
          : [...state.messages[payload.channelId], payload.message]
    },
    channels: {
      ...state.channels,
      [payload.guildId]: {
        ...state.channels[payload.guildId],
        [payload.channelId]: {
          ...state.channels[payload.guildId][payload.channelId],
          lastMessageAt: payload.message.createdAt,
          ...(!state.channels[payload.guildId][payload.channelId]
            .firstMessageId && { firstMessageId: payload.message.id })
        }
      }
    },
    membersTyping: {
      ...state.membersTyping,
      [payload.channelId]: state.membersTyping[payload.channelId].filter(
        memberId => memberId !== payload.message.userId
      )
    },
    ...(payload.userId === payload.message.userId && {
      lastChannelVisits: {
        ...state.lastChannelVisits,
        [payload.channelId]: new Date()
      }
    })
  };
};

export default addMessage;
