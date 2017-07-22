// @flow
import post from './util/post.js';
import buildQuery from './../query/repository.js';
import onError from './util/onError.js';

const mergeRepository = (repo, old) => ({
  ...repo,
  issues: {
    nodes: [
      ...(old ? old.issues.nodes : []),
      ...(repo.issues ? repo.issues.nodes : []),
    ],
    pageInfo: {
      ...(old ? old.issues.pageInfo : {}),
      ...(repo.issues ? repo.issues.pageInfo : {}),
    },
    totalCount: repo.issues ?
      repo.issues.totalCount : old.issues.totalCount,
  },
  pullRequests: {
    nodes: [
      ...(old ? old.pullRequests.nodes : []),
      ...(repo.pullRequests ? repo.pullRequests.nodes : []),
    ],
    pageInfo: {
      ...(old ? old.pullRequests.pageInfo : {}),
      ...(repo.pullRequests ? repo.pullRequests.pageInfo : {}),
    },
    totalCount: repo.pullRequests ?
      repo.pullRequests.totalCount : old.pullRequests.totalCount,
  },
});

const onSuccess = (resp, repository) => {
  if (resp.data.errors) {
    return {
      success: false,
      error: new Error(resp.data.errors.map((e) => e.message).join("\n")),
    };
  } else {
    return {
      success: true,
      repository: repository ? mergeRepository(resp.data.data.repository, repository) : resp.data.data.repository,
      rateLimit: resp.data.data.rateLimit,
    };
  }
};

function paginate({success, repository, rateLimit, error}, {owner, name, issueOrderDirection, pullRequestOrderDirection}, token) {
  if (!success) return {success, error};

  const issuePageInfo = repository.issues.pageInfo;
  const hasMoreIssues = issuePageInfo && issuePageInfo.hasPreviousPage;
  const pullRequestPageInfo = repository.pullRequests.pageInfo;
  const hasMorePullRequests = pullRequestPageInfo && pullRequestPageInfo.hasPreviousPage;

  if (hasMorePullRequests || hasMoreIssues) {
    const pullRequestBefore = pullRequestPageInfo && pullRequestPageInfo.startCursor;
    const issueBefore = issuePageInfo && issuePageInfo.startCursor;
    const ignoreIssues = !hasMoreIssues;
    const ignorePullRequests = !hasMorePullRequests;
    const param = {
      owner,
      name,
      issueOrderDirection,
      issueBefore,
      ignoreIssues,
      pullRequestOrderDirection,
      pullRequestBefore,
      ignorePullRequests
    };

    return fetchRepository(param, token, repository);
  } else {
    return {
      success,
      repository,
      rateLimit,
    };
  }
}

export default function fetchRepository(
  param: {owner: string, name: string},
  token: string,
  repository: any = undefined
) {
  const {query, variables} = buildQuery(param);

  return post({query, variables, token}).
    // then((resp) => onSuccess(resp, repository)).
  then((resp) => paginate(onSuccess(resp, repository), variables, token)).
    catch(onError);
}
