import { SET_MODAL } from "../../constants";

const MODAL_GUILD_ADD = "MODAL_GUILD_ADD";
const MODAL_GUILD_DELETE = "MODAL_GUILD_DELETE";
const MODAL_GUILD_LEAVE = "MODAL_GUILD_LEAVE";
const MODAL_USER_UPDATE = "MODAL_USER_UPDATE";

export const openGuildAddModal = () => ({
  type: SET_MODAL,
  payload: {
    component: MODAL_GUILD_ADD
  }
});
export const openGuildDeleteModal = () => ({
  type: SET_MODAL,
  payload: {
    component: MODAL_GUILD_DELETE
  }
});
export const openGuildLeaveModal = () => ({
  type: SET_MODAL,
  payload: {
    component: MODAL_GUILD_LEAVE
  }
});
export const openUserUpdateModal = () => ({
  type: SET_MODAL,
  payload: {
    component: MODAL_USER_UPDATE
  }
});

export const closeModal = () => ({
  type: SET_MODAL,
  payload: {
    component: null
  }
});
