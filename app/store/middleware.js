import { applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
} from 'electron-redux';


const defaultMiddleware = process.env.NODE_ENV === "production" ? [] : [
  createLogger({
    level: 'info',
    collapsed: true
  }),
];

function withElectronReduxMiddleware(middleware, scope, history) {
  if (scope === "main") {
    return [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ];
  }
  if (scope === "renderer" && history) {
    return [
      forwardToMain,
      routerMiddleware(history),
      ...middleware,
    ];
  }

  throw new Error("scope is not valid");
}

const withReduxDevTool = (middleware, scope) =>
      (process.env.NODE_ENV !== "production" &&
       scope === "renderer" &&
       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware) :
      compose(middleware);

export default function(saga, scope = "main", history) {
  const middleware = applyMiddleware(
    ...withElectronReduxMiddleware(
      [...defaultMiddleware, saga],
      scope,
      history
    )
  );

  return withReduxDevTool(middleware, scope);
}
