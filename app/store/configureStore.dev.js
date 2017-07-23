// @flow
import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/index.js';
import createMiddleware from './middleware.js';

window.store = null;

const configureStore = (initialState, history) => {

  const sagaMiddleware = createSagaMiddleware();
  // Create Store
  window.store = createStore(
    rootReducer,
    initialState,
    createMiddleware(sagaMiddleware, history)
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => window.store.replaceReducer(require('../reducers'))
    );
  }

  return window.store;
};

export default configureStore;
