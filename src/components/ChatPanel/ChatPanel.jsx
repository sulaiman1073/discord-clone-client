import React, { useRef, useLayoutEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../redux/actions";
import "./ChatPanel.css";
import MessageGroup from "../MessageGroup";

const Spinner = () => (
  <div className="ChatPanel--spinner">
    <div className="ChatPanel--spinner--cube1" />
    <div className="ChatPanel--spinner--cube2" />
  </div>
);

export default function ChatPanel() {
  const defaultAvatar = useSelector(({ userState }) => userState.defaultAvatar);
  const clientUserId = useSelector(({ userState }) => userState.id);
  const messages = useSelector(({ chatState }) =>
    chatState.messages[chatState.activeChannels[chatState.activeGuild]].map(
      message => ({
        id: message.id,
        userId: message.userId,
        username: message.author.username,
        avatar: message.author.avatar || defaultAvatar,
        message: message.message,
        createdAt: message.createdAt
      })
    )
  );
  const activeChannel = useSelector(
    ({ chatState }) => chatState.activeChannels[chatState.activeGuild]
  );
  const firstMessageId = useSelector(
    ({ chatState }) =>
      chatState.channels[chatState.activeGuild][
        chatState.activeChannels[chatState.activeGuild]
      ].firstMessageId
  );
  const lastMessageAt = useSelector(
    ({ chatState }) =>
      chatState.channels[chatState.activeGuild][
        chatState.activeChannels[chatState.activeGuild]
      ].lastMessageAt
  );
  const lastMessageByClient = useSelector(
    ({ chatState }) =>
      chatState.messages[chatState.activeChannels[chatState.activeGuild]]
        .length !== 0 &&
      chatState.messages[chatState.activeChannels[chatState.activeGuild]][
        chatState.messages[chatState.activeChannels[chatState.activeGuild]]
          .length - 1
      ].userId === clientUserId
  );
  const fetchingMessages = useSelector(
    ({ chatState }) => chatState.fetchingMessages
  );
  const dispatch = useDispatch();
  const handleGetMessages = useCallback(() => dispatch(getMessages()), [
    dispatch
  ]);

  const chatPanelRef = useRef();

  useLayoutEffect(() => {
    chatPanelRef.current.scrollTo(0, chatPanelRef.current.scrollHeight);
  }, [activeChannel]);

  useLayoutEffect(() => {
    if (
      lastMessageAt &&
      (lastMessageByClient ||
        chatPanelRef.current.scrollHeight -
          (chatPanelRef.current.scrollTop + chatPanelRef.current.offsetHeight) <
          500)
    ) {
      chatPanelRef.current.scrollTo({
        top: chatPanelRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [lastMessageAt, lastMessageByClient]);

  const formattedMessages = [];
  let currentUser = "";

  messages.forEach(message => {
    if (message.userId !== currentUser) {
      currentUser = message.userId;
      formattedMessages.push({
        ...message,
        message: [message.message]
      });
    } else {
      formattedMessages[formattedMessages.length - 1].message.push(
        message.message
      );
    }
  });

  const clickHandler = () => {
    chatPanelRef.current.scrollTo(0, 1);
    handleGetMessages();
  };

  return (
    <div className="ChatPanel--container" ref={chatPanelRef}>
      <>
        {messages.length !== 0 &&
          messages[0].id !== firstMessageId &&
          (fetchingMessages ? (
            <Spinner />
          ) : (
            <button
              type="button"
              className="ChatPanel--loadMore"
              onClick={clickHandler}
            >
              LOAD MORE MESSAGES
            </button>
          ))}

        {formattedMessages.map(message => (
          <MessageGroup
            key={message.id}
            userId={message.userId}
            username={message.username}
            createdAt={message.createdAt}
            avatar={message.avatar}
            messages={message.message}
          />
        ))}
      </>
    </div>
  );
}
