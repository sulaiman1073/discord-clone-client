import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import isUuid from "uuid-validate";
import { createGuild, joinGuild } from "../../redux/actions";
import Spinner2 from "../Spinner2";
import "./AddGuild.css";

const Header = page => (
  <h2 className="AddGuild--header">
    {page === "create" ? "CREATE A GUILD" : "JOIN A GUILD"}
  </h2>
);

const BottomPanel = ({ page, setPage, submitHandler, loading }) => (
  <div className="AddGuild--bottomPanel">
    <button type="button" onClick={() => setPage("home")} disabled={loading}>
      <i className="fas fa-long-arrow-alt-left fa-2x" />
      <p>BACK</p>
    </button>
    <button
      type="button"
      className={
        page === "create" ? "AddGuild--createButton" : "AddGuild--joinButton"
      }
      disabled={loading}
      onClick={submitHandler}
    >
      {loading ? <Spinner2 /> : page === "create" ? "Create" : "Join"}
    </button>
  </div>
);

const HomePage = ({ setPage }) => (
  <div className="AddGuild--home">
    <button type="button" onClick={() => setPage("create")}>
      Create a Guild
    </button>
    <button type="button" onClick={() => setPage("join")}>
      Join a Guild
    </button>
  </div>
);

const CreatePage = ({
  page,
  setPage,
  submitHandler,
  guildName,
  setGuildName,
  error,
  loading
}) => (
  <div className="AddGuild--create">
    <Header page={page} />
    <div className="AddGuild--createInput">
      <p>GUILD NAME</p>
      <input
        type="text"
        placeholder="Enter guild name"
        value={guildName}
        onChange={e => setGuildName(e.target.value)}
        disabled={loading}
        autoFocus
        maxLength={50}
      />
    </div>
    <div>{error && <p className="AddGuild--error">{error}</p>}</div>
    <BottomPanel
      page={page}
      setPage={setPage}
      submitHandler={submitHandler}
      loading={loading}
    />
  </div>
);

const JoinPage = ({
  page,
  setPage,
  submitHandler,
  inviteCode,
  setInviteCode,
  error,
  loading
}) => (
  <div className="AddGuild--join">
    <Header page={page} />
    <div className="AddGuild--joinInput">
      <input
        type="text"
        value={inviteCode}
        onChange={e => setInviteCode(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <p>Enter invite code</p>
    </div>
    <div>{error && <p className="AddGuild--error">{error}</p>}</div>

    <BottomPanel
      page={page}
      setPage={setPage}
      submitHandler={submitHandler}
      loading={loading}
    />
  </div>
);

export default function AddGuild() {
  const { chatApiLoading: apiLoading, chatApiError: apiError } = useSelector(
    state => state.apiState
  );
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState("home");
  const [guildName, setGuildName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (apiError) {
      setError(apiError);
    }
  }, [apiError, mounted]);

  const submitHandler = () => {
    if (page === "create") {
      if (guildName.length >= 2) {
        dispatch(createGuild(guildName));
      } else {
        setError("Guild name too short");
      }
    } else if (page === "join") {
      if (isUuid(inviteCode)) {
        dispatch(joinGuild(inviteCode));
      } else {
        setError("Invalid invite code.");
      }
    }
  };

  return (
    <div className="AddGuild--container">
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "create" && (
        <CreatePage
          page={page}
          setPage={setPage}
          submitHandler={submitHandler}
          guildName={guildName}
          setGuildName={setGuildName}
          error={error}
        />
      )}
      {page === "join" && (
        <JoinPage
          page={page}
          setPage={setPage}
          submitHandler={submitHandler}
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          error={error}
          loading={apiLoading}
        />
      )}
    </div>
  );
}
