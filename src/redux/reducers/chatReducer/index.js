import initChat from "./initChat";
import addGuild from "./addGuild";
import updateGuild from "./updateGuild";
import deleteGuild from "./deleteGuild";
import updateChannels from "./updateChannels";
import addMember from "./addMember";
import updateMember from "./updateMember";
import deleteMember from "./deleteMember";
import addMessage from "./addMessage";
import setActiveGuild from "./setActiveGuild";
import setActiveChannel from "./setActiveChannel";
import addChannelMessages from "./addChannelMessages";
import addFetchedMessages from "./addFetchedMessages";
import addMemberTyping from "./addMemberTyping";
import deleteMemberTyping from "./deleteMemberTyping";
import setSocketBusy from "./setSocketBusy";
import setDraft from "./setDraft";
import setFetchingMessages from "./setFetchingMessages";
import setGuildOrder from "./setGuildOrder";

import {
  INIT_CHAT,
  SET_ACTIVE_GUILD,
  SET_ACTIVE_CHANNEL,
  MESSAGE_ADD,
  ADD_FETCHED_MESSAGES,
  SET_SOCKET_BUSY,
  MEMBER_ADD_TYPING,
  MEMBER_DELETE_TYPING,
  SET_DRAFT,
  MEMBER_UPDATE,
  MEMBER_ADD,
  GUILD_ADD,
  GUILD_UPDATE,
  ADD_CHANNEL_MESSAGES,
  SET_FETCHING_MESSAGES,
  CHANNELS_UPDATE,
  GUILD_DELETE,
  MEMBER_DELETE,
  SET_GUILD_ORDER
} from "../../constants";

const initialState = {
  guilds: null,
  members: null,
  channels: null,
  messages: null,
  activeGuild: null,
  activeChannels: null,
  drafts: null,
  lastChannelVisits: null,
  membersTyping: null,
  lastTypes: null,
  socketBusy: false,
  fetchingMessages: false,
  guildOrder: null
};

export default (state = initialState, { type, payload }) => {
  if (type === INIT_CHAT) {
    return initChat(state, payload);
  }
  if (type === GUILD_ADD) {
    return addGuild(state, payload);
  }
  if (type === GUILD_UPDATE) {
    return updateGuild(state, payload);
  }
  if (type === GUILD_DELETE) {
    return deleteGuild(state, payload);
  }
  if (type === CHANNELS_UPDATE) {
    return updateChannels(state, payload);
  }
  if (type === MEMBER_ADD) {
    return addMember(state, payload);
  }
  if (type === MEMBER_DELETE) {
    return deleteMember(state, payload);
  }
  if (type === MESSAGE_ADD) {
    return addMessage(state, payload);
  }
  if (type === ADD_CHANNEL_MESSAGES) {
    return addChannelMessages(state, payload);
  }
  if (type === ADD_FETCHED_MESSAGES) {
    return addFetchedMessages(state, payload);
  }
  if (type === MEMBER_UPDATE) {
    return updateMember(state, payload);
  }
  if (type === SET_ACTIVE_GUILD) {
    return setActiveGuild(state, payload);
  }
  if (type === SET_ACTIVE_CHANNEL) {
    return setActiveChannel(state, payload);
  }
  if (type === SET_DRAFT) {
    return setDraft(state, payload);
  }
  if (type === MEMBER_ADD_TYPING) {
    return addMemberTyping(state, payload);
  }
  if (type === MEMBER_DELETE_TYPING) {
    return deleteMemberTyping(state, payload);
  }
  if (type === SET_SOCKET_BUSY) {
    return setSocketBusy(state, payload);
  }
  if (type === SET_FETCHING_MESSAGES) {
    return setFetchingMessages(state, payload);
  }
  if (type === SET_GUILD_ORDER) {
    return setGuildOrder(state, payload);
  }

  return state;
};
