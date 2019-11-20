const addMember = (state, payload) => {
  return {
    ...state,
    members: {
      ...state.members,
      [payload.guildId]: {
        ...state.members[payload.guildId],
        [payload.userId]: payload.member
      }
    }
  };
};

export default addMember;
