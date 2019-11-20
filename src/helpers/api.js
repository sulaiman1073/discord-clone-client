import axios from "axios";

export const register = registerInfo => {
  return axios.post("api/users/", registerInfo);
};

export const login = loginInfo => {
  return axios.post("/api/sessions/login", loginInfo);
};

export const validateSession = () => {
  return axios.get("/api/sessions/validate");
};

export const logout = () => {
  return axios.post("/api/sessions/logout");
};

export const updateUser = updateInfo => {
  return axios.put("/api/users/", updateInfo);
};

export const updateGuild = (guildId, guildInfo) => {
  return axios.put(`/api/guilds/${guildId}`, guildInfo);
};

export const sendChatMessage = messageInfo => {
  return axios.post("/api/messages/", messageInfo);
};

export const getGuild = (guildId, channelId) => {
  if (!channelId) {
    return axios.get(`/api/guilds/?guildId=${guildId}`);
  }
  return axios.get(`/api/guilds/?guildId=${guildId}&channelId=${channelId}`);
};

export const getMessages = (channelId, afterMessageId, beforeMessageId) => {
  if (!afterMessageId && !beforeMessageId) {
    return axios.get(`/api/messages/${channelId}`);
  }
  if (afterMessageId && !beforeMessageId) {
    return axios.get(
      `/api/messages/${channelId}?afterMessageId=${afterMessageId}`
    );
  }
  if (!afterMessageId && beforeMessageId) {
    return axios.get(
      `/api/messages/${channelId}?beforeMessageId=${beforeMessageId}`
    );
  }
  return axios.get(
    `/api/messages/${channelId}?afterMessageId=${afterMessageId}&beforeMessageId=${beforeMessageId}`
  );
};

export const initChat = channelId => {
  if (!channelId) {
    return axios.get(`/api/chat/`);
  }
  return axios.get(`/api/chat/?channelId=${channelId}`);
};

export const createGuild = name => {
  return axios.post("/api/guilds/", { name });
};

export const joinGuild = inviteCode => {
  return axios.post("/api/members/", { inviteCode });
};

export const leaveGuild = guildId => {
  return axios.delete(`/api/members/${guildId}`);
};

export const deleteGuild = guildId => {
  return axios.delete(`/api/guilds/${guildId}`);
};

export const typing = (guildId, channelId) => {
  return axios.post(`/api/chat/typing/`, { guildId, channelId });
};

export const updateChannels = (
  guildId,
  { addedChannels, updatedChannels, deletedChannels }
) => {
  return axios.put(`/api/channels/`, {
    guildId,
    ...(addedChannels.length !== 0 && { addedChannels }),
    ...(updatedChannels.length !== 0 && { updatedChannels }),
    ...(deletedChannels.length !== 0 && { deletedChannels })
  });
};
