/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDraft, sendMessage } from "../../redux/actions";
import "./DraftPanel.css";

const TypingSpinner = () => (
  <div className="TypingSpinner--container">
    <div className="TypingSpinner--bounce1" />
    <div className="TypingSpinner--bounce2" />
    <div className="TypingSpinner--bounce3" />
  </div>
);

export default function DraftPanel() {
  const draft = useSelector(
    ({ chatState }) =>
      chatState.drafts[chatState.activeChannels[chatState.activeGuild]]
  );
  const channelName = useSelector(
    ({ chatState }) =>
      chatState.channels[chatState.activeGuild][
        chatState.activeChannels[chatState.activeGuild]
      ].name
  );
  const activeChannel = useSelector(
    ({ chatState }) => chatState.activeChannels[chatState.activeGuild]
  );
  const membersTyping = useSelector(({ chatState }) =>
    chatState.membersTyping[
      chatState.activeChannels[chatState.activeGuild]
    ].map(
      memberId => chatState.members[chatState.activeGuild][memberId].username
    )
  );
  const dispatch = useDispatch();
  const setDraftDispatcher = useCallback(x => dispatch(setDraft(x)), [
    dispatch
  ]);
  const sendMessageDispatcher = useCallback(() => dispatch(sendMessage()), [
    dispatch
  ]);

  const textareaRef = useRef();

  useEffect(() => {
    textareaRef.current.focus();
  }, [activeChannel]);

  const handleChange = e => {
    e.target.style.height = "";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 168)}px`;

    setDraftDispatcher(e.target.value);
  };

  const handleSubmit = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.style.height = "";
      sendMessageDispatcher();
    }
  };

  const TypingMembers = () => {
    if (membersTyping.length === 1) {
      return (
        <p>
          <span>{membersTyping[0]}</span> is typing...
        </p>
      );
    }
    if (membersTyping.length === 2) {
      return (
        <p>
          <span>{membersTyping[0]}</span> and <span>{membersTyping[1]}</span>{" "}
          are typing...
        </p>
      );
    }
    if (membersTyping.length === 3) {
      return (
        <p>
          <span>{membersTyping[0]}</span>, <span>{membersTyping[1]}</span> and{" "}
          <span>{membersTyping[2]}</span> are typing...
        </p>
      );
    }
    return <p>Several people are typing...</p>;
  };

  return (
    <div className="DraftPanel--container">
      <div className="DraftPanel--input">
        <textarea
          placeholder={`Message #${channelName}`}
          value={draft}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          ref={textareaRef}
        />
        <button type="button">
          <img
            className="emoji"
            alt="emojis"
            src="https://twemoji.maxcdn.com/v/12.1.3/72x72/1f600.png"
          />
        </button>
      </div>
      <div className="DraftPanel--typing">
        {membersTyping.length !== 0 && (
          <>
            <TypingSpinner />
            <TypingMembers />
          </>
        )}
      </div>
    </div>
  );
}
