import {takeLatest, select, put, call} from 'redux-saga/effects';
import api from './../api/fetchRepository.js';

function* fetchOwnerAndName(payload) {
  if (payload && payload.owner && payload.name) {
    return {
      owner: payload.owner,
      name: payload.name,
    };
  }

  const repo = yield select((state) => state.addRepository.form);
  return repo;
}

export function* fetch({payload}) {
  const token = yield select((state) => state.token.value);
  const ownerAndName = yield fetchOwnerAndName(payload);

  yield put({type: "ADD_REPOSITORY_FETCH_START", payload: {...ownerAndName}});
  const response = yield call(api, ownerAndName, token);

  if (response.success) {
    yield put({
      type: "ADD_REPOSITORY_FETCH_SUCCESS",
      payload: {
        repository: response.repository,
        rateLimit: response.rateLimit,
      },
    });
  } else {
    yield put({
      type: "ADD_REPOSITORY_FETCH_FAILED",
      payload: {
        ...ownerAndName,
        error: response.error.toString()
      },
      error: true,
    });
  }
}

export default function* () {
  yield takeLatest(
    ['ADD_REPOSITORY_ON_ADD', "REPOSITORY_CLICK_RELOAD"],
    fetch
  );
}
