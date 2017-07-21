import Actor from './Actor.js';
import PageInfo from './PageInfo.js';

export default `
  nodes {
    id
    content
    user {
      ${Actor}
    }
  }
  pageInfo {
    ${PageInfo}
  }
  totalCount
`;
