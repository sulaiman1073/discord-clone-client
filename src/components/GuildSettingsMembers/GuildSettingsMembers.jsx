import React, { useState } from "react";
import { useSelector } from "react-redux";
import discriminatorFormatter from "../../util/discriminatorFormatter";
import "./GuildSettingsMembers.css";

export default function GuildSettingsMembers() {
  const defaultAvatar = useSelector(({ userState }) => userState.defaultAvatar);
  const members = useSelector(
    ({ chatState }) => chatState.members[chatState.activeGuild]
  );
  const [input, setInput] = useState("");

  const filteredMembers = Object.entries(members)
    .map(([memberId, member]) => ({
      id: memberId,
      username: member.username,
      discriminator: discriminatorFormatter(member.discriminator),
      avatar: member.avatar || defaultAvatar
    }))
    .filter(member =>
      member.username.toLowerCase().includes(input.toLowerCase())
    )
    .sort((a, b) =>
      a.username.toLowerCase() > b.username.toLowerCase()
        ? 1
        : b.username.toLowerCase() > a.username.toLowerCase()
        ? -1
        : 0
    );

  return (
    <div className="GuildSettingsMembers--container">
      <h3>GUILD MEMBERS</h3>
      <div>
        <p>{`${filteredMembers.length} Members`}</p>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          {input.length === 0 ? (
            <div>
              <i className="fas fa-search" />
            </div>
          ) : (
            <div
              className="GuildSettingsMembers--close"
              role="button"
              onClick={() => setInput("")}
            >
              <i className="fas fa-times" />
            </div>
          )}
        </div>
      </div>
      <div className="GuildSettingsMembers--memberList">
        {filteredMembers.map(member => (
          <div className="GuildSettingsMembers--member" key={member.id}>
            <img src={member.avatar} alt="avatar" />
            <p>{`${member.username}#${member.discriminator}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
