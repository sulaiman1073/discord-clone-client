import React from "react";
import ReactTooltip from "react-tooltip";
import "./MessageGroup.css";
import dateFormatter from "../../util/dateFormatter";
import dateFormatter2 from "../../util/dateFormatter2";

export default function MessageGroup({
  userId,
  username,
  createdAt,
  avatar,
  messages
}) {
  return (
    <div className="MessageGroup--container">
      <ReactTooltip
        place="top"
        effect="solid"
        className="MessageGroup--tooltip"
        delayShow={1000}
        id="MessageGroup--tooltip"
      />
      <img
        src={avatar}
        alt="avatar"
        // onClick={() => handleMemberSelect(userId)}
      />
      <div>
        <div className="MessageGroup--header">
          <div>
            {username}{" "}
            <span
              data-for="MessageGroup--tooltip"
              data-tip={dateFormatter2(createdAt)}
            >
              {dateFormatter(new Date(createdAt))}
            </span>
          </div>
        </div>
        {messages.map((message, index) => (
          <div key={index} className="MessageGroup--message">
            {message}
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}
