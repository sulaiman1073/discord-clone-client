/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { leaveGuild, closeModal } from "../../redux/actions";
import "./LeaveGuild.css";
import Spinner2 from "../Spinner2";

export default function LeaveGuild() {
  const guildName = useSelector(
    ({ chatState }) => chatState.guilds[chatState.activeGuild].name
  );
  const { chatApiLoading: apiLoading, chatApiError: apiError } = useSelector(
    state => state.apiState
  );
  const dispatch = useDispatch();
  const leaveGuildDispatcher = useCallback(() => dispatch(leaveGuild()), [
    dispatch
  ]);
  const closeModalDispatcher = useCallback(() => dispatch(closeModal()), [
    dispatch
  ]);

  return (
    <div className="LeaveGuild--container">
      <h3>LEAVE {guildName}</h3>
      <p>
        Are you sure you want to leave <span>{guildName}</span>?
      </p>

      <div className="LeaveGuild--buttons">
        <button
          type="button"
          disabled={apiLoading}
          onClick={closeModalDispatcher}
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={apiLoading}
          onClick={leaveGuildDispatcher}
        >
          {apiLoading ? <Spinner2 /> : "Leave Guild"}
        </button>
      </div>
    </div>
  );
}
