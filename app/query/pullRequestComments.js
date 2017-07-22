// @flow
import IssueCommentConnection from './fragments/IssueCommentConnection.js';
import type {Params} from './issueComments.js';

const query = `
query pullRequestComments(
  $owner: String!,
  $name: String!,
  $pullRequestNumber: Int!,
  $commentsAfter: String
) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $pullRequestNumber) {
      comments(first: 100, after: $commentsAfter) {
        ${IssueCommentConnection}
      }
    }
  }
}
`;

export default function({
  owner,
  name,
  number,
  commentsAfter,
}: Params) {
  return {
    query,
    variables: {
      owner,
      name,
      pullRequestNumber: number,
      commentsAfter,
    }
  };
}
