import {takeLatest, select} from 'redux-saga/effects';
import {saveState} from './../utils/storage.js';

function* clearRepositories() {
  const state = yield select((s) => s);
  saveState({
    token: state.token,
  });
}

export default function* () {
  yield takeLatest(
    "CLEAR_REPOSITORIES",
    clearRepositories
  );
}
