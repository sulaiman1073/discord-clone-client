/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import ReactTooltip from "react-tooltip";
import { openGuildLeaveModal } from "../../redux/actions";
import "./GuildHeader.css";

export default withRouter(function GuildHeader({ history }) {
  const { name, inviteCode, ownerId } = useSelector(
    ({ chatState }) => chatState.guilds[chatState.activeGuild]
  );
  const clientUserId = useSelector(({ userState }) => userState.id);
  const dispatch = useDispatch();
  const openGuildLeaveModalDispatcher = useCallback(
    () => dispatch(openGuildLeaveModal()),
    [dispatch]
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    menuRef.current.focus();
  }, [menuOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);

      ReactTooltip.hide();
    } catch (error) {}
  };

  const redirectToGuildsSettingsPage = () => {
    history.push("/guildSettings");
  };

  const owner = clientUserId === ownerId;

  return (
    <div
      className="GuildHeader--container"
      onMouseDown={menuOpen ? undefined : () => setMenuOpen(true)}
      role="button"
    >
      {menuOpen && (
        <div
          className="GuildHeader--menu"
          ref={menuRef}
          tabIndex="0"
          onBlur={() => {
            setMenuOpen(false);
          }}
        >
          <ReactTooltip
            place="right"
            effect="solid"
            className="GuildHeader--tooltip"
            afterShow={copyToClipboard}
            delayHide={1000}
            id="GuildHeader--tooltip"
          />
          <div
            role="button"
            data-for="GuildHeader--tooltip"
            data-tip="Copied!"
            data-event="click"
            className="GuildHeader--invite"
          >
            <p>Guild Invite Code</p>
            <i className="fas fa-user-plus" />
          </div>
          {owner ? (
            <div role="button" onClick={redirectToGuildsSettingsPage}>
              <p>Guild Settings</p>
              <i className="fas fa-cog" />
            </div>
          ) : (
            <div
              role="button"
              onClick={openGuildLeaveModalDispatcher}
              className="GuildHeader--leave"
            >
              <p>Leave Guild</p>
              <i className="fas fa-sign-out-alt" />
            </div>
          )}
        </div>
      )}
      <h1 className="GuildHeader--header">{name}</h1>
      {menuOpen ? (
        <i className="fas fa-times" />
      ) : (
        <i className="fas fa-chevron-down" />
      )}
    </div>
  );
});

// export default withRouter(GuildHeader);
