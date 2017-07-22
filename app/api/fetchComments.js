import post from './util/post.js';
import buildIssueQuery from './../query/issueComments.js';
import buildPullRequestQuery from './../query/pullRequestComments.js';
import onError from './util/onError.js';

const onSuccess = ({data}, isIssue, old) => {
  if (data.errors) {
    return {
      success: false,
      error: new Error(data.errors.map((e) => e.message)).join("\n"),
    };
  } else {
    const {repository, rateLimit} = data.data;
    const comments = isIssue ?
          repository.issue.comments :
          repository.pullRequest.comments;

    return {
      success: true,
      comments: {
        nodes: [
          ...(old ? old.nodes : []),
          ...comments.nodes,
        ],
        pageInfo: comments.pageInfo,
        totalCount: comments.totalCount,
      },
      rateLimit,
    };
  }
};

function paginate(
  {success, comments, error, rateLimit},
  {owner, name, number, token},
  isIssue
) {
  if (!success) return {success, error};

  const pageInfo = comments.pageInfo;
  const hasMore = pageInfo.hasNextPage;

  if (hasMore) {
    const params = {
      owner,
      name,
      number,
      token,
      commentsAfter: pageInfo.endCursor,
    };

    return fetchComments(params, isIssue, comments);
  } else {
    return {
      success,
      comments,
      rateLimit,
    };
  }
}

export default function fetchComments(
  {owner, name, number, commentsAfter, token},
  isIssue,
  comments = undefined
) {
  const {query, variables} = isIssue ?
        buildIssueQuery({owner, name, number, commentsAfter}) :
        buildPullRequestQuery({owner, name, number, commentsAfter});
  return post({query, variables, token}).
    then((resp) => paginate(
      onSuccess(resp, isIssue, comments),
      {owner, name, number, token},
      isIssue
    )).catch(onError);
}

