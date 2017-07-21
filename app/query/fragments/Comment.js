import Actor from './Actor.js';

export default `
  body
  author {
    ${Actor}
  }
  publishedAt
  editor {
    ${Actor}
  }
  lastEditedAt
`;
