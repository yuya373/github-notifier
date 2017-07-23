import { routerReducer as router } from 'react-router-redux';
import token from './token.js';
import addRepository from './add_repository.js';
import repositories from './repositories.js';
import timers from './timers.js';

const rootReducer = (state, action) => {
  const savedState = state.savedState;
  return ({
    router: router(state.router, action),
    token: token(state.token, action, savedState.token),
    addRepository: addRepository(
      state.addRepository,
      action,
      savedState.addRepository
    ),
    repositories: repositories(state.repositories, action, savedState.repositories),
    timers: timers(state.timers, action, savedState.timers),
    savedState,
  });
};

export default rootReducer;
