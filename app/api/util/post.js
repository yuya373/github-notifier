// @flow
import {post} from 'axios';

const url: string = "https://api.github.com/graphql";

type Params = {
  query: string,
  variables: any,
  token: string
};

export default function({query, variables, token}: Params) {
  const config = {
    headers: {
      "Authorization": `bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const params = {
    query,
    variables,
  };
  return post(url, params, config);
}
