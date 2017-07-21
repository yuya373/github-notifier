import IssueComment from './IssueComment.js';
import PageInfo from './PageInfo.js';

export default `
  nodes {
    ${IssueComment}
  }
  pageInfo {
    ${PageInfo}
  }
  totalCount
`;
