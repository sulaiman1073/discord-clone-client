const updateMember = (state, payload) => {
  // rewrite, only change effected

  let newMembers = state.members;

  payload.guildIds.forEach(guildId => {
    newMembers = {
      ...newMembers,
      [guildId]: {
        ...newMembers[guildId],
        [payload.userId]: {
          ...newMembers[guildId][payload.userId],
          ...(payload.username && { username: payload.username }),
          ...(payload.discriminator && {
            discriminator: payload.discriminator
          }),
          ...(payload.avatar !== undefined && { avatar: payload.avatar }),
          ...(payload.status && { status: payload.status }),
          ...(payload.online && { online: payload.online })
        }
      }
    };
  });

  return {
    ...state,
    members: newMembers
  };
};

export default updateMember;
