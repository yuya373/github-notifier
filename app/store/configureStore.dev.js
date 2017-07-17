// @flow
import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import rootReducer from '../reducers';
import rootSaga from '../sagas/index.js';
import createMiddleware from './middleware.js';


const configureStore = (initialState, scope = "main", history = undefined) => {

  const sagaMiddleware = createSagaMiddleware();
  // Create Store
  const store = createStore(
    rootReducer,
    initialState,
    createMiddleware(sagaMiddleware, scope, history)
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
                      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
                     );
  }

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
};

export default configureStore;
