const initState = (savedState) => ({
  // issue: {
  //   newArrivals: savedState ? savedState.issue.newArrivals : [],
  //   newComments: savedState ? savedState.issue.newComments : [],
  // },
  // pullRequest: {
  //   newArrivals: savedState ? savedState.pullRequest.newArrivals : [],
  //   newComments: savedState ? savedState.pullRequest.newComments : [],
  // },
  // values: savedState ?
  //   savedState.values.filter((e) => e.name !== undefined && e.owner !== undefined) :
  //   [],
  values: [],
});

const mergeNewNotification = (repo, {issue, pullRequest}) => {
  const findNewComment = (l, e) => l.newComments.find((f) => e.number === f.number);
  const rejectNewComment = (l, old) => l.filter((e) => !findNewComment(old, e));

  return {
    issue: {
      newArrivals: rejectNewComment(repo.issue.newArrivals, issue).
        concat(issue.newArrivals),
      newComments: rejectNewComment(repo.issue.newComments, issue).
        concat(issue.newComments),
    },
    pullRequest: {
      newArrivals: rejectNewComment(repo.pullRequest.newArrivals, pullRequest).
        concat(pullRequest.newArrivals),
      newComments: rejectNewComment(repo.pullRequest.newComments, pullRequest).
        concat(pullRequest.newComments),
    }
  };
};

const mergeRepository = (state, {name, owner, issue, pullRequest}) => {
  const repo = state.values.find((e) => e.name === name && e.owner === owner);
  return {
    ...state,
    values: state.values.
      filter((e) => !(e.name === name && e.owner === owner)).concat([
        repo ? {
          name,
          owner,
          ...mergeNewNotification(repo, {issue, pullRequest})
        } : ({name, owner, issue, pullRequest})
      ])
  };
};

export default function(state, action, savedState) {
  if (!state) state = initState(savedState);

  switch(action.type) {
  case "NEW_NOTIFICATION":
    return mergeRepository(state, action.payload);
  default:
    return state;
  }
}
