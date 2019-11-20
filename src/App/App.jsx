import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router";
import { Redirect } from "react-router-dom";
import HomePage from "../routes/HomePage";
import LoginPage from "../routes/LoginPage";
import GuildSettingsPage from "../routes/GuildSettingsPage";
import ModalManager from "../components/ModalManager";
import { validateSession } from "../redux/actions";
import "@fortawesome/fontawesome-free/css/all.css";
import "./fw.css";
import "./App.css";

export default function App() {
  const loggedIn = useSelector(({ userState }) => userState.id);
  const dispatch = useDispatch();
  // const dispatchValidateSession = useCallback(
  //   () => dispatch(validateSession()),
  //   [dispatch]
  // );

  useEffect(() => {
    dispatch(validateSession());
  }, [dispatch]);

  return (
    <section className="App--container">
      <ModalManager />
      <Switch>
        {loggedIn && <Route exact path="/" component={HomePage} />}
        {loggedIn && (
          <Route path="/guildSettings" component={GuildSettingsPage} />
        )}
        {!loggedIn && <Route path="/login" component={LoginPage} />}
        {!loggedIn && <Route path="/register" component={LoginPage} />}
        <Route
          path="/"
          render={() =>
            loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </section>
  );
}
