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

function configureStore(initialState, scope = "main", history = undefined) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    createMiddleware(sagaMiddleware, scope, history)
  );
  sagaMiddleware.run(rootSaga);

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
}

export default configureStore;
