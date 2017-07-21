import Actor from './Actor.js';
import PageInfo from './PageInfo.js';

export default `
  nodes {
    ${Actor}
  }
  pageInfo {
    ${PageInfo}
  }
`;
