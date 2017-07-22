import {takeLatest, select, put, call} from 'redux-saga/effects';
import api from './../api/fetchComments.js';

function* fetchComments({type, payload}) {
  const {owner, name, number} = payload;
  const isIssue = type === "LOAD_ISSSUE";
  const defaultPayload = {owner, name, number, isIssue};
  const token = yield select((state) => state.token.value);
  const issueOrPullRequest = yield select((state) => {
    const repository = state.repositories.values.
          find((e) => e.nameWithOwner === `${owner}/${name}`);
    if (isIssue) {
      return repository.issues.nodes.
        find((e) => e.number === number);
    } else {
      return repository.pullRequests.nodes.
        find((e) => e.number === number);
    }
  });

  const {hasNextPage, endCursor} = issueOrPullRequest.comments.pageInfo;
  if (!hasNextPage) return;

  yield put({type: "FETCH_COMMENT_START", payload: defaultPayload});

  const apiParams = {
    owner,
    name,
    number,
    token,
    commentsAfter: endCursor
  };

  const response = yield call(api, apiParams, isIssue);

  if (response.success) {
    yield put({
      type: "FETCH_COMMENT_SUCCESS",
      payload: {...defaultPayload, comments: response.comments},
    });
  } else {
    yield put({
      type: "FETCH_COMMENT_FAILED",
      payload: {...defaultPayload, error: response.error},
    });
  }

}

export default function* () {
  yield takeLatest(
    [
      'LOAD_ISSSUE',
      'LOAD_PULL_REQUEST',
    ],
    fetchComments
  );
}
