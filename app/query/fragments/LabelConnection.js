import PageInfo from './PageInfo.js';

export default `
  nodes {
    color
    name
  }
  pageInfo {
    ${PageInfo}
  }
  totalCount
`;
