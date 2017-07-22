// @flow
import IssueCommentConnection from './fragments/IssueCommentConnection.js';
import RateLimit from './fragments/RateLimit.js';

const query = `
query issueComments(
  $owner: String!,
  $name: String!,
  $issueNumber: Int!,
  $commentsAfter: String
) {
  repository(owner: $owner, name: $name) {
    issue(number: $issueNumber) {
      comments(first: 100, after: $commentsAfter) {
        ${IssueCommentConnection}
      }
    }
  }
  ${RateLimit}
}
`;

export type Params = {
  owner: string,
  name: string,
  number: number,
  commentsAfter: string
};

export default function({
  owner, name, number, commentsAfter,
}: Params) {
  return {
    query,
    variables: {
      owner,
      name,
      issueNumber: number,
      commentsAfter,
    },
  };
}
