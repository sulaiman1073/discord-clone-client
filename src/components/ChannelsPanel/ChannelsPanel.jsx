/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { setActiveChannel } from "../../redux/actions";
import "./ChannelsPanel.css";

export default function ChannelsPanel() {
  const channels = useSelector(({ chatState }) =>
    Object.entries(chatState.channels[chatState.activeGuild]).map(
      ([channelId, channel]) => ({
        id: channelId,
        name: channel.name,
        position: channel.position,
        status:
          !channel.lastMessageAt ||
          new Date(chatState.channelsLastVisits[channelId]) >
            new Date(channel.lastMessageAt)
            ? "checked"
            : "unchecked"
      })
    )
  );
  const activeChannel = useSelector(
    ({ chatState }) => chatState.activeChannels[chatState.activeGuild]
  );
  const dispatch = useDispatch();

  const handleChannelSelect = channelId => {
    if (channelId === activeChannel) return;

    dispatch(setActiveChannel(channelId));
  };

  return (
    <div className="ChannelsPanel--container">
      {channels
        .sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        )
        .map(channel => {
          const channelClasses = classNames({
            "ChannelsPanel--channel": true,
            "ChannelsPanel--channelChecked": channel.status === "checked",
            "ChannelsPanel--channelActive": channel.id === activeChannel
          });

          return (
            <div
              className={channelClasses}
              key={channel.id}
              onClick={() => handleChannelSelect(channel.id)}
              role="button"
            >
              <i className="fas fa-hashtag fa-md" />
              <p>
                {channel.name.length <= 18
                  ? channel.name
                  : `${channel.name.slice(0, 18)}...`}
              </p>
              <div className="ChannelsPanel--channelSlate" />
            </div>
          );
        })}
    </div>
  );
}
