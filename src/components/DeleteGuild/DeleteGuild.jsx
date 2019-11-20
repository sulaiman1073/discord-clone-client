/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteGuild, closeModal } from "../../redux/actions";
import Input1 from "../Input1";
import Spinner2 from "../Spinner2";
import "./DeleteGuild.css";

export default function DeleteGuild() {
  const guildName = useSelector(
    ({ chatState }) => chatState.guilds[chatState.activeGuild].name
  );
  const { chatApiLoading: apiLoading, chatApiError: apiError } = useSelector(
    state => state.apiState
  );
  const dispatch = useDispatch();
  const closeModalDispatcher = useCallback(() => dispatch(closeModal()), [
    dispatch
  ]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (name !== guildName) {
      setError(true);
    } else {
      dispatch(deleteGuild());
    }
  };

  return (
    <div className="DeleteGuild--container">
      <h3>DELETE {guildName}</h3>
      <div>
        <p>
          Are you sure you want to delete <span>{guildName}</span>? This action
          cannot be undone.
        </p>
      </div>
      <Input1
        header="ENTER GUILD NAME"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
        spellCheck={false}
        disabled={apiLoading}
      />
      {error && (
        <p className="DeleteGuild--error">
          You didn't enter the guild name correctly
        </p>
      )}
      {apiError && !error && <p className="DeleteGuild--error">{apiError}</p>}

      <div className="DeleteGuild--buttons">
        <button
          type="button"
          disabled={apiLoading}
          onClick={closeModalDispatcher}
        >
          Cancel
        </button>
        <button type="button" disabled={apiLoading} onClick={handleSubmit}>
          {apiLoading ? <Spinner2 /> : "Delete Guild"}
        </button>
      </div>
    </div>
  );
}
