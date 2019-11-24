import debounceHashed from "debounce-hashed";
import {
  INIT_CHAT,
  SET_WS,
  MEMBER_DELETE_TYPING,
  MESSAGE_ADD,
  MEMBER_ADD,
  MEMBER_DELETE,
  GUILD_DELETE,
  GUILD_UPDATE,
  CHANNELS_UPDATE,
  MEMBER_UPDATE,
  MEMBER_ADD_TYPING,
  LOGOUT
} from "./constants";
import { initChat, setActiveChannel } from "./actions";

const WS_HELLO = "HELLO";
const WS_PING = "PING";
const WS_PONG = "PONG";
const WS_GUILD_UPDATE = "GUILD_UPDATE";
const WS_GUILD_DELETE = "GUILD_DELETE";
const WS_CHANNELS_UPDATE = "CHANNELS_UPDATE";
const WS_MEMBER_ADD = "MEMBER_ADD";
const WS_MEMBER_DELETE = "MEMBER_DELETE";
const WS_MEMBER_TYPING = "MEMBER_TYPING";
const WS_MESSAGE_ADD = "MESSAGE_ADD";
const WS_USER_UPDATE = "USER_UPDATE";

let socket;
let interval;
let timeout;

const websocketMiddleware = url => {
  return store => next => action => {
    next(action);

    if (action.type === INIT_CHAT && !store.getState().wsState.connected) {
      const removeMemberTyping = (guildId, channelId, userId) => {
        const channelExists =
          store.getState().chatState.channels[guildId] &&
          store.getState().chatState.channels[guildId][channelId];
        const memberExists =
          store.getState().chatState.members[guildId] &&
          store.getState().chatState.members[guildId][userId];

        if (channelExists && memberExists) {
          store.dispatch({
            type: MEMBER_DELETE_TYPING,
            payload: { channelId, userId }
          });
        }
      };

      const removeMemberTypingDebounced = debounceHashed(
        removeMemberTyping,
        function hashingFn(guildId, channelId, userId) {
          return `${channelId}${userId}`;
        },
        10000
      );

      socket = new WebSocket(url);

      const heartbeat = () => {
        clearTimeout(timeout);

        socket.send(
          JSON.stringify({
            type: WS_PONG
          })
        );

        timeout = setTimeout(() => {
          socket.close();
        }, store.getState().wsState.heartbeatInterval + 1000);
      };

      socket.onopen = () => {
        clearInterval(interval);
      };

      socket.onclose = () => {
        clearTimeout(timeout);

        store.dispatch({
          type: SET_WS,
          payload: { connected: false, heartbeatInterval: null }
        });

        if (!socket.dontReconnect) {
          interval = setInterval(() => {
            store.dispatch(initChat());
          }, 10000);
        }
      };

      socket.onmessage = ({ data: message }) => {
        const parsedMessage = JSON.parse(message);
        const messageType = parsedMessage.type;
        const messagePayload = parsedMessage.payload;

        if (messageType === WS_HELLO) {
          store.dispatch({
            type: SET_WS,
            payload: {
              connected: true,
              heartbeatInterval: Number(messagePayload.heartbeatInterval)
            }
          });

          heartbeat();
        } else if (messageType === WS_PING) {
          heartbeat();
        } else if (messageType === WS_GUILD_UPDATE) {
          store.dispatch({
            type: GUILD_UPDATE,
            payload: messagePayload
          });
        } else if (messageType === WS_GUILD_DELETE) {
          store.dispatch({
            type: GUILD_DELETE,
            payload: messagePayload
          });

          const {
            activeGuild: ag,
            activeChannels: ac
          } = store.getState().chatState;

          store.dispatch(setActiveChannel(ac[ag]));
        } else if (messageType === WS_CHANNELS_UPDATE) {
          store.dispatch({
            type: CHANNELS_UPDATE,
            payload: messagePayload
          });
        } else if (messageType === WS_MEMBER_ADD) {
          store.dispatch({
            type: MEMBER_ADD,
            payload: messagePayload
          });
        } else if (messageType === WS_MEMBER_DELETE) {
          store.dispatch({
            type: MEMBER_DELETE,
            payload: messagePayload
          });
        } else if (messageType === WS_MESSAGE_ADD) {
          store.dispatch({
            type: MESSAGE_ADD,
            payload: {
              ...messagePayload,
              userId: store.getState().userState.id
            }
          });
        } else if (messageType === WS_USER_UPDATE) {
          store.dispatch({
            type: MEMBER_UPDATE,
            payload: messagePayload
          });
        } else if (messageType === WS_MEMBER_TYPING) {
          store.dispatch({
            type: MEMBER_ADD_TYPING,
            payload: {
              ...messagePayload,
              clientUserId: store.getState().userState.id
            }
          });
          removeMemberTypingDebounced(
            messagePayload.guildId,
            messagePayload.channelId,
            messagePayload.userId
          );
        }
      };
    } else if (action.type === LOGOUT && store.getState().wsState.connected) {
      socket.dontReconnect = true;
      socket.close();
    }
  };
};

export default websocketMiddleware;
