import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  updateChannels,
  updateGuild,
  openGuildDeleteModal
} from "../../redux/actions";
import SettingsOptions from "../../components/SettingsOptions";
import GuildSettingsGeneral from "../../components/GuildSettingsGeneral";
import GuildSettingsChannels from "../../components/GuildSettingsChannels";
import GuildSettingsMembers from "../../components/GuildSettingsMembers";
import "./GuildSettingsPage.css";

Modal.setAppElement("#root");

export default function GuildSettingsPage() {
  const guilds = useSelector(({ chatState }) => chatState.guilds);
  const channels = useSelector(({ chatState }) => chatState.channels);
  const members = useSelector(({ chatState }) => chatState.members);
  const activeGuild = useSelector(({ chatState }) => chatState.activeGuild);
  const defaultAvatar = useSelector(({ userState }) => userState.defaultAvatar);
  const apiLoading = useSelector(({ apiState }) => apiState.chatApiLoading);
  const apiError = useSelector(({ apiState }) => apiState.chatApiError);
  const [page, setPage] = useState("General");
  const dispatch = useDispatch();
  const openGuildDeleteModalDispatcher = useCallback(
    () => dispatch(openGuildDeleteModal()),
    [dispatch]
  );

  return (
    <div className="GuildSettingsPage--container">
      <SettingsOptions
        currentOption={page}
        options={["General", "Channels", "Members", "Delete Guild"]}
        onDelete={openGuildDeleteModalDispatcher}
        setOption={setPage}
      />
      <div className="GuildSettingsPage--close">
        <Link to="/">
          <i className="fas fa-times" />
        </Link>
      </div>
      {page === "General" && (
        <GuildSettingsGeneral
          name={guilds[activeGuild].name}
          icon={guilds[activeGuild].icon}
          inviteCode={guilds[activeGuild].inviteCode}
          defaultIcon={defaultAvatar}
          apiLoading={apiLoading}
          apiError={apiError}
          handleSubmit={x => dispatch(updateGuild(x))}
        />
      )}
      {page === "Channels" && (
        <GuildSettingsChannels
          channels={channels[activeGuild]}
          channelsUpdateHandler={x => dispatch(updateChannels(x))}
          apiLoading={apiLoading}
          apiError={apiError}
        />
      )}
      {page === "Members" && (
        <GuildSettingsMembers
          members={members[activeGuild]}
          defaultAvatar={defaultAvatar}
        />
      )}
    </div>
  );
}
