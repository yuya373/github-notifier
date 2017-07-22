// @flow
import UserConnection from './fragments/UserConnection.js';
import IssueCommentConnection from './fragments/IssueCommentConnection.js';
import LabelConnection from './fragments/LabelConnection.js';
import Actor from './fragments/Actor.js';
import ReactionConnection from './fragments/ReactionConnection.js';
import PageInfo from './fragments/PageInfo.js';
import PullRequestReviewConnection from './fragments/PullRequestReviewConnection.js';
import Comment from './fragments/Comment.js';
import RateLimit from './fragments/RateLimit.js';

const query = `
query repository(
  $owner: String!,
  $name: String!,
  $pullRequestStates: [PullRequestState!],
  $pullRequestOrderField: IssueOrderField!,
  $pullRequestOrderDirection: OrderDirection!,
  $pullRequestBefore: String,
  $issueBefore: String,
  $issueStates: [IssueState!],
  $issueOrderField: IssueOrderField!,
  $issueOrderDirection: OrderDirection!,
  $reviewRequestAfter: String,
  $reviewsAfter: String,
  $reviewCommentsAfter: String,
  $assigneesAfter: String,
  $labelsAfter: String,
  $ignorePullRequests: Boolean!,
  $ignoreIssues: Boolean!
) {
  repository(owner: $owner, name: $name) {
    id
    name
    nameWithOwner
    owner {
      ${Actor}
    }
    issues(
      last: 20,
      before: $issueBefore,
      states: $issueStates,
      orderBy: { field: $issueOrderField, direction: $issueOrderDirection }
    ) @skip(if: $ignoreIssues) {
      nodes {
        assignees(first: 20, after: $assigneesAfter) {
          ${UserConnection}
        }
        comments(first: 20) {
          ${IssueCommentConnection}
        }
        participants(first: 20) {
          ${UserConnection}
        }
        reactions(first: 20) {
          ${ReactionConnection}
        }
        labels(first: 20, after: $labelsAfter) {
          ${LabelConnection}
        }
        author {
          ${Actor}
        }
        id
        body
        bodyText
        closed
        createdAt
        editor {
          ${Actor}
        }
        lastEditedAt
        locked
        number
        publishedAt
        url
        state
        title
      }
      pageInfo {
        ${PageInfo}
      }
      totalCount
    }
    pullRequests(
      last: 20,
      before: $pullRequestBefore,
      states: $pullRequestStates,
      orderBy: { field: $pullRequestOrderField, direction: $pullRequestOrderDirection }
    ) @skip(if: $ignorePullRequests) {
      nodes {
        assignees(first: 20, after: $assigneesAfter) {
          ${UserConnection}
        }
        labels(first: 20, after: $labelsAfter) {
          ${LabelConnection}
        }
        comments(first: 20) {
          ${IssueCommentConnection}
        }
        reviewRequests(first: 20, after: $reviewRequestAfter) {
          nodes {
            reviewer {
              ${Actor}
            }
          }
          pageInfo {
            ${PageInfo}
          }
          totalCount
        }
        reviews(first: 20, after: $reviewsAfter) {
          nodes {
            comments(first: 20, after: $reviewCommentsAfter) {
              nodes {
                ${PullRequestReviewConnection}
              }
              pageInfo {
                ${PageInfo}
              }
              totalCount
            }
            ${Comment}
            state
          }
          pageInfo {
            ${PageInfo}
          }
        }
        reactions(first: 20) {
          ${ReactionConnection}
        }
        id
        number
        title
        author
        headRefName
        baseRefName
        mergeable
        merged
        mergedAt
        state
        url
        publishedAt
        ${Comment}
        bodyText
      }
      pageInfo {
        ${PageInfo}
      }
      totalCount
    }
  }
  ${RateLimit}
}
`;

type PullRequestState = "OPEN" | "CLOSED" | "MERGED";
type IssueOrderField = "CREATED_AT" | "UPDATED_AT" | "COMMENTS";
type OrderDirection = "ASC" | "DESC";
type IssueState = "OPEN" | "CLOSED";

type Variables = {
  owner: string,
  name: string,
  pullRequestStates?: Array<PullRequestState>,
  pullRequestOrderField?: IssueOrderField,
  pullRequestOrderDirection?: OrderDirection,
  pullRequestBefore?: ?string,
  issueBefore?: ?string,
  issueStates?: Array<IssueState>,
  issueOrderField?: IssueOrderField,
  issueOrderDirection?: OrderDirection,
  reviewRequestAfter?: string,
  reviewsAfter?: string,
  reviewCommentsAfter?: string,
  assigneesAfter?: string,
  labelsAfter?: string,
  ignorePullRequests?: boolean,
  ignoreIssues?: boolean
};

export default function({
  owner,
  name,
  pullRequestStates = ["OPEN"],
  pullRequestOrderField = "CREATED_AT",
  pullRequestOrderDirection = "ASC",
  pullRequestBefore,
  issueBefore,
  issueStates = ["OPEN"],
  issueOrderField = "CREATED_AT",
  issueOrderDirection = "ASC",
  reviewRequestAfter,
  reviewsAfter,
  reviewCommentsAfter,
  assigneesAfter,
  labelsAfter,
  ignorePullRequests = false,
  ignoreIssues = false
}: Variables) {
  return {
    query,
    variables: {
      owner,
      name,
      pullRequestStates,
      pullRequestOrderField,
      pullRequestOrderDirection,
      pullRequestBefore,
      issueBefore,
      issueStates,
      issueOrderField,
      issueOrderDirection,
      reviewRequestAfter,
      reviewsAfter,
      reviewCommentsAfter,
      assigneesAfter,
      labelsAfter,
      ignorePullRequests,
      ignoreIssues,
    },
  };
}
