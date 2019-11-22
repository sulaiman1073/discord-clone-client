import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import "./MembersPanel.css";

export default function MembersPanel() {
  const defaultAvatar = useSelector(({ userState }) => userState.defaultAvatar);
  const members = useSelector(({ chatState }) =>
    Object.entries(chatState.members[chatState.activeGuild]).map(
      ([memberId, member]) => ({
        id: memberId,
        username: member.username,
        discriminator: member.discriminator,
        avatar: member.avatar || defaultAvatar,
        status: member.status,
        online: member.online,
        updatedAvatar: member.updatedAvatar
      })
    )
  );

  const onlineMembers = members
    .filter(member => member.online)
    .sort((a, b) =>
      a.username.toLowerCase() > b.username.toLowerCase()
        ? 1
        : b.username.toLowerCase() > a.username.toLowerCase()
        ? -1
        : 0
    );
  const offlineMembers = members
    .filter(member => !member.online)
    .sort((a, b) =>
      a.username.toLowerCase() > b.username.toLowerCase()
        ? 1
        : b.username.toLowerCase() > a.username.toLowerCase()
        ? -1
        : 0
    );

  return (
    <div className="MembersPanel--container">
      {onlineMembers.length !== 0 && (
        <div>
          <p>{`ONLINE (${onlineMembers.length})`}</p>
          {onlineMembers.map(member => {
            const memberClasses = classNames({
              "MembersPanel--member": true,
              "MembersPanel--statusAvailable": member.status === "available",
              "MembersPanel--statusAway": member.status === "away",
              "MembersPanel--statusBusy": member.status === "busy"
            });

            return (
              <div
                key={member.id}
                className={memberClasses}
                role="button"
                // onClick={() => handleMemberSelect(member.id)}
              >
                <div className="MembersPanel--avatar">
                  <img
                    src={
                      member.updatedAvatar
                        ? `${member.avatar}?${member.updatedAvatar}`
                        : member.avatar
                    }
                    alt="avatar"
                  />
                  <div className="MembersPanel--status" />
                </div>
                <p>
                  {member.username.length <= 18
                    ? member.username
                    : `${member.username.slice(0, 18)}...`}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {offlineMembers.length !== 0 && (
        <div>
          <p>{`OFFLINE (${offlineMembers.length})`}</p>
          {offlineMembers.map(member => (
            <div
              key={member.id}
              className="MembersPanel--member MembersPanel--offline"
              role="button"
              // onClick={() => handleMemberSelect(member.id)}
            >
              <div className="MembersPanel--avatar">
                <img
                  src={
                    member.updatedAvatar
                      ? `${member.avatar}?${member.updatedAvatar}`
                      : member.avatar
                  }
                  alt="avatar"
                />
              </div>
              <p>
                {member.username.length <= 18
                  ? member.username
                  : `${member.username.slice(0, 18)}...`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
