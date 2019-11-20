import _ from "lodash";

const deleteMember = (state, payload) => {
  return {
    ...state,
    members: _.omit(state.members, `[${payload.guildId}][${payload.userId}]`)
  };
};

export default deleteMember;
