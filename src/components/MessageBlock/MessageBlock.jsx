import React from "react";
import "./MessageBlock.css";
import dateFormatter from "../../util/dateFormatter";

export default function MessageBlock({
  userId,
  username,
  createdAt,
  avatar,
  messages
}) {
  return (
    <div className="MessageBlock--container">
      <img
        src={avatar}
        alt="avatar"
        // onClick={() => handleMemberSelect(userId)}
      />
      <div>
        <div className="MessageBlock--header">
          <p>{username}</p>
          <p>{dateFormatter(new Date(createdAt))}</p>
        </div>
        {messages.map((message, index) => (
          <p key={index} className="MessageBlock--message">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
