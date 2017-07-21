// @flow
import {post} from 'axios';
import buildQuery from './../query/repository.js';

const url: string = "https://api.github.com/graphql";

const mergeRepository = (repo, old) => ({
  ...repo,
  issues: {
    nodes: [
      ...old.issues.nodes,
      ...(repo.issues ? repo.issues.nodes : []),
    ],
    pageInfo: {
      ...old.issues.pageInfo,
      ...(repo.issues ? repo.issues.pageInfo : {}),
    },
    totalCount: repo.issues ?
      repo.issues.totalCount : old.issues.totalCount,
  },
  pullRequests: {
    nodes: [
      ...old.pullRequests.nodes,
      ...(repo.pullRequests ? repo.pullRequests.nodes : []),
    ],
    pageInfo: {
      ...old.pullRequests.pageInfo,
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

const onError = (error) => {
  const {message, documentation_url} = error.response.data;

  return ({
    success: false,
    error: new Error(`${message}`),
  });
};

function paginate({success, repository, rateLimit, error}, {owner, name, issueOrderDirection, pullRequestOrderDirection}, token) {
  if (!success) return {success, error};

  const issuePageInfo = repository.issues.pageInfo;
  const hasMoreIssues = issuePageInfo && issuePageInfo.hasPreviousPage;
  const pullRequestPageInfo = repository.pullRequests.pageInfo;
  const hasMorePullRequests = pullRequestPageInfo && pullRequestPageInfo.hasPreviousPage;

  console.log("hasMorePullRequests", hasMorePullRequests, "hasMoreIssues", hasMoreIssues);

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

export default function fetchRepository(param: {owner: string, name: string}, token: string, repository = undefined) {
  const {query, variables} = buildQuery(param);
  const params = { query, variables };

  const config = {
    headers: {
      "Authorization": `bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return post(url, params, config).
    // then((resp) => onSuccess(resp, repository)).
  then((resp) => paginate(onSuccess(resp, repository), variables, token)).
    catch((e) => console.log(e));
}
