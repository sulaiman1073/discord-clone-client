import { SET_USER_INFO, USER_UPDATE, LOGOUT } from "../constants";

const initialState = {
  id: null,
  username: null,
  discriminator: null,
  avatar: null,
  status: null,
  email: null,
  emailVerified: null,
  defaultAvatar: "https://i.imgur.com/7VbpwDl.png"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        id: payload.id,
        username: payload.username,
        discriminator: payload.discriminator,
        avatar: payload.avatar,
        status: payload.status,
        email: payload.email,
        emailVerified: payload.emailVerified
      };

    case USER_UPDATE:
      return {
        ...state,
        ...(payload.username && { username: payload.username }),
        ...(payload.discriminator && { discriminator: payload.discriminator }),
        ...(payload.avatar !== undefined && { avatar: payload.avatar }),
        ...(payload.status && { status: payload.status }),
        ...(payload.email && { email: payload.email }),
        ...(payload.emailVerified && { emailVerified: payload.emailVerified })
      };

    case LOGOUT:
      return {
        ...state,
        ...initialState
      };

    default:
      return state;
  }
};
