import {findRepositoryFromNameWithOwner} from './../utils/findRepository.js';
import {findIssueFromNumber} from './../utils/findIssue.js';

const initialState = (savedState) => ({
  ids: savedState.ids || [],
  values: savedState.values || [],
  fetchingIds: [],
  errors: savedState.errors || [],
});

const appendRepository = (state, {repository, rateLimit}) => {
  const values = state.values.filter(
    (e) => e && e.nameWithOwner !== repository.nameWithOwner
  );
  const i = state.ids.indexOf(repository.nameWithOwner);

  return {
    ids: i >= 0 ? state.ids : state.ids.concat([repository.nameWithOwner]),
    values: values.concat([{...repository, rateLimit}]),
  };
};

const filterIds = (ids, {name, owner}) =>
      ids.filter((e) => e !== `${owner}/${name}`);

const filterIdsFromRepository = (ids, {name, owner}) =>
      filterIds(ids, {name, owner: owner.login});

const filterErrors = (errors, {owner, name}) =>
      errors.filter((e) => e.id !== `${owner}/${name}`);

const updateComment = (values, {owner, name, number, isIssue, comments}) => {
  const update = (nodes) => {
    const issue = findIssueFromNumber(nodes, number);
    const newIssue = {
      ...issue,
      comments: {
        nodes: [
          ...issue.comments.nodes.filter((e) => comments.nodes.find((f) => f.id !== e.id)),
          ...comments.nodes,
        ],
        pageInfo: comments.pageInfo,
        totalCount: comments.totalCount,
      },
    };
    return nodes.filter((e) => e.number !== number).
      concat([newIssue]);
  };

  const repository = findRepositoryFromNameWithOwner(values, {name, owner});
  const newRepository = {
    ...repository,
    issues: {
      ...repository.issues,
      nodes: isIssue ? update(repository.issues.nodes) : repository.issues.nodes,
    },
    pullRequests: {
      ...repository.pullRequests,
      nodes: isIssue ? repository.pullRequests.nodes : update(repository.pullRequests.nodes),
    },
  };

  return values.filter((e) => e.nameWithOwner !== `${owner}/${name}`).
    concat([newRepository]);
};


export default function(state, action, savedState) {
  if (!state) state = initialState(savedState || {});

  switch(action.type) {
  case "ADD_REPOSITORY_FETCH_SUCCESS":
    return {
      ...state,
      ...appendRepository(state, action.payload),
      fetchingIds: filterIdsFromRepository(state.fetchingIds, action.payload.repository),
    };
  case "ADD_REPOSITORY_FETCH_START":
    return {
      ...state,
      fetchingIds: filterIds(state.fetchingIds, action.payload).
        concat([`${action.payload.owner}/${action.payload.name}`]),
      errors: filterErrors(state.errors, action.payload),
    };
  case "ADD_REPOSITORY_FETCH_FAILED":
    return {
      ...state,
      fetchingIds: filterIds(state.fetchingIds, action.payload),
      errors: filterErrors(state.errors, action.payload).concat({
        id: `${action.payload.owner}/${action.payload.name}`,
        error: action.payload.error,
      })
    };
  case "FETCH_COMMENT_SUCCESS":
    return {
      ...state,
      values: updateComment(state.values, action.payload),
    };
  default:
    return state;
  }
}
