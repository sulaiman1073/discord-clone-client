import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initChat } from "../../redux/actions";

import GuildsPanel from "../../components/GuildsPanel";
import ChannelsPanel from "../../components/ChannelsPanel";
import MembersPanel from "../../components/MembersPanel";
import UserPanel from "../../components/UserPanel";
import DraftPanel from "../../components/DraftPanel";
import ChatPanel from "../../components/ChatPanel";
import GuildHeader from "../../components/GuildHeader";
import ChannelHeader from "../../components/ChannelHeader";
import LoadingPage from "../../components/LoadingPage";
import "./ChatPage.css";

export default function ChatPage() {
  const wsConnected = useSelector(({ wsState }) => wsState.connected);
  const hasGuilds = useSelector(
    ({ chatState }) =>
      !chatState.guilds || Object.keys(chatState.guilds).length !== 0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (wsConnected) return;
    dispatch(initChat());
  }, [dispatch, wsConnected]);

  if (!wsConnected) return <LoadingPage />;

  return (
    <div className="ChatPage--container">
      <GuildsPanel />
      <UserPanel />
      {!hasGuilds && (
        <>
          <div className="ChatPage--noGuilds1" />
          <div className="ChatPage--noGuilds2" />
        </>
      )}
      {hasGuilds && (
        <>
          <ChannelsPanel />
          <MembersPanel />
          <ChatPanel />
          <DraftPanel />
          <GuildHeader />
          <ChannelHeader />
        </>
      )}
    </div>
  );
}
