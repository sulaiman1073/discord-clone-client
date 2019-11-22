import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openGuildDeleteModal } from "../../redux/actions";
import SettingsOptions from "../../components/SettingsOptions";
import GuildSettingsGeneral from "../../components/GuildSettingsGeneral";
import GuildSettingsChannels from "../../components/GuildSettingsChannels";
import GuildSettingsMembers from "../../components/GuildSettingsMembers";
import "./GuildSettingsPage.css";

export default function GuildSettingsPage() {
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
      {page === "General" && <GuildSettingsGeneral />}
      {page === "Channels" && <GuildSettingsChannels />}
      {page === "Members" && <GuildSettingsMembers />}
    </div>
  );
}
