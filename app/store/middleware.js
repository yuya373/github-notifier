import { applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

const defaultMiddleware = process.env.NODE_ENV === "production" ? [] : [
  createLogger({
    level: 'info',
    collapsed: true
  }),
];

function withElectronReduxMiddleware(middleware, history) {
  return [
    // forwardToMain,
    routerMiddleware(history),
    ...middleware,
  ];
}

const withReduxDevTool = (middleware) =>
      (process.env.NODE_ENV !== "production" &&
       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware) :
      compose(middleware);

export default function(saga, history) {
  const middleware = applyMiddleware(
    ...withElectronReduxMiddleware(
      [...defaultMiddleware, saga],
      history
    )
  );

  return withReduxDevTool(middleware);
}
