/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-empty */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import { setStatus, openUserUpdateModal } from "../../redux/actions";
import discriminatorFormatter from "../../util/discriminatorFormatter";
import "./UserPanel.css";

export default function UserPanel() {
  const { username, discriminator, status } = useSelector(
    state => state.userState
  );
  const avatar = useSelector(
    ({ userState }) => userState.avatar || userState.defaultAvatar
  );

  const dispatch = useDispatch();
  const openUserUpdateModalDispatcher = useCallback(
    () => dispatch(openUserUpdateModal()),
    [dispatch]
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    menuRef.current.focus();
  }, [menuOpen]);

  const handleStatus = newStatus => {
    if (newStatus === status) return;

    dispatch(setStatus(newStatus));
  };

  const avatarClasses = classNames({
    "UserPanel--avatar": true,
    "UserPanel--statusOnline": status === "online",
    "UserPanel--statusAway": status === "away",
    "UserPanel--statusBusy": status === "busy"
  });

  const statusHandler = newStatus => {
    handleStatus(newStatus);
    setMenuOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${username}#${discriminatorFormatter(discriminator)}`
      );

      ReactTooltip.hide();
    } catch (error) {}
  };

  return (
    <div className="UserPanel--container">
      <ReactTooltip
        place="top"
        effect="solid"
        className="UserPanel--tooltip"
        afterShow={copyToClipboard}
        delayHide={1000}
        id="UserPanel--tooltip"
      />
      {menuOpen && (
        <div
          className="UserPanel--statusMenu"
          ref={menuRef}
          tabIndex="0"
          onBlur={() => {
            setMenuOpen(false);
          }}
        >
          <div onClick={() => statusHandler("online")} role="button">
            <div />
            <p>Available</p>
          </div>
          <div onClick={() => statusHandler("away")} role="button">
            <div />
            <p>Away</p>
          </div>
          <div onClick={() => statusHandler("busy")} role="button">
            <div />
            <p>Busy</p>
          </div>
        </div>
      )}
      <div className="UserPanel--user">
        <div
          className={avatarClasses}
          onClick={() => {
            setMenuOpen(true);
          }}
          role="button"
        >
          <img src={`${avatar}?${performance.now()}`} alt="avatar" />
          <div className="UserPanel--status" />
        </div>
        <div
          className="UserPanel--name"
          data-for="UserPanel--tooltip"
          data-tip="Copied!"
          data-event="click"
        >
          <p>{username}</p>
          <p>{discriminatorFormatter(discriminator)}</p>
        </div>
      </div>
      <button
        type="button"
        className="UserPanel--settings"
        onClick={openUserUpdateModalDispatcher}
      >
        <i className="fas fa-cog fa-lg" />
      </button>
    </div>
  );
}
