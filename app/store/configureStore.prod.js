// @flow
import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/index.js';
import createMiddleware from './middleware.js';

function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    createMiddleware(sagaMiddleware, history)
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
