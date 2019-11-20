import React from "react";
import { useSelector } from "react-redux";
import "./ChannelHeader.css";

export default function ChannelHeader() {
  const channelName = useSelector(
    ({ chatState }) =>
      chatState.channels[chatState.activeGuild][
        chatState.activeChannels[chatState.activeGuild]
      ].name
  );

  return (
    <div className="ChannelHeader--container">
      <i className="fas fa-hashtag fa-lg" />
      <h3>{channelName}</h3>
    </div>
  );
}
