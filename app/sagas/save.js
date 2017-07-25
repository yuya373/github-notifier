import {takeLatest, select} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {saveState} from './../utils/storage.js';

function* save() {
  const state = yield select((s) => s);
  saveState(state);
}

export default function* () {
  yield takeLatest(
    [
      LOCATION_CHANGE,
      'TOKEN_CHANGED',
      "FETCH_COMMENT_SUCCESS",
      "NEW_NOTIFICATION",
    ],
    save
  );
}
