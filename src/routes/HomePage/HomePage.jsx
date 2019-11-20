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
import "./HomePage.css";

export default function HomePage() {
  const guilds = useSelector(({ chatState }) => chatState.guilds);
  const connected = useSelector(({ chatState }) => chatState.connected);
  const wsConnected = useSelector(({ wsState }) => wsState.connected);
  const hasGuilds = useSelector(
    ({ chatState }) =>
      !chatState.guilds || Object.keys(chatState.guilds).length !== 0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (connected) return;
    dispatch(initChat());
  }, [connected, dispatch]);

  if (!guilds || !wsConnected) return <LoadingPage />;

  return (
    <div className="HomePage--container">
      <GuildsPanel />
      <UserPanel />
      {!hasGuilds && (
        <>
          <div className="HomePage--noGuilds1" />
          <div className="HomePage--noGuilds2" />
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
