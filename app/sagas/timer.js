import {take, select, put, takeEvery, call} from 'redux-saga/effects';
import fetchRepository from './../api/fetchRepository.js';

const detectUpdates = (newIssues, old) => newIssues.reduce((a, e) => {
  const oldIssue = old.find((f) => e.number === f.number);
  if (oldIssue) {
    const newComments = e.comments.totalCount;
    const oldComments = oldIssue.comments.totalCount;
    if (oldComments < newComments) {
      a.newComments.push(e);
    }
  } else {
    a.newArrivals.push(e);
  }
  return a;
}, {
  newArrivals: [],
  newComments: [],
});



function* notify(oldRepository, newRepository, {owner, name}) {
  const oldIssues = oldRepository.issues.nodes;
  const newIssues = newRepository.issues.nodes;

  const issueUpdates = detectUpdates(newIssues, oldIssues);

  const oldPullRequests = oldRepository.pullRequests.nodes;
  const newPullRequests = newRepository.pullRequests.nodes;

  const pullRequestUpdates = detectUpdates(newPullRequests, oldPullRequests);

  yield put({
    type: "NEW_NOTIFICATION",
    payload: {
      owner,
      name,
      issue: {
        ...issueUpdates,
      },
      pullRequest: {
        ...pullRequestUpdates,
      },
    },
  });
}

function* fetchAndNotify({payload}) {
  const {owner, name} = payload;
  const oldRepository = yield select(
    (s) => s.repositories.values.
      find((e) => e.name === name && e.owner.login === owner)
  );
  const token = yield select((state) => state.token.value);
  const response = yield call(fetchRepository, {owner, name}, token);

  if (response.success) {
    yield put({
      type: "ADD_REPOSITORY_FETCH_SUCCESS",
      payload: {
        repository: response.repository,
        rateLimit: response.rateLimit,
      },
    });
    yield notify(oldRepository, response.repository, {owner, name});
  }
}

export default function*() {
  yield takeEvery(
    "TIMER_FETCH_REPOSITORY",
    fetchAndNotify
  );
}
