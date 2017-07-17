// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import token from './token.js';

const rootReducer = combineReducers({
  router,
  token,
});

export default rootReducer;
