/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import {
  chatReducer,
  userReducer,
  modalReducer,
  apiReducer,
  wsReducer
} from "./reducers";
import websocketMiddleware from "./websocketMiddleware";
import localstorageMiddleware from "./localstorageMiddleware";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    chatState: chatReducer,
    userState: userReducer,
    modalState: modalReducer,
    apiState: apiReducer,
    wsState: wsReducer
  });

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const middleware =
  process.env.NODE_ENV !== "production"
    ? [
        require("redux-immutable-state-invariant").default(),
        thunk,
        localstorageMiddleware(),
        websocketMiddleware(process.env.REACT_APP_WS_URL),
        routerMiddleware(history)
      ]
    : [
        thunk,
        localstorageMiddleware(),
        websocketMiddleware(process.env.REACT_APP_WS_URL),
        routerMiddleware(history)
      ];

const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
