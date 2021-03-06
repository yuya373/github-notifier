import {connect} from 'react-redux';
import {findRepositoryFromMatch} from './../utils/findRepository.js';
import Repository from './../components/Repository.js.jsx';

const findError = (state, {owner, name}) => {
  const error = state.repositories.errors.
        find((e) => e.id === `${owner}/${name}`);
  if (error) return error.error;
  return null;
};

export default connect(
  (state, props) => ({
    repository: findRepositoryFromMatch(state, props.match),
    fetching: state.repositories.fetchingIds.includes(`${props.match.params.owner}/${props.match.params.name}`),
    error: findError(state, props.match.params),
    notification: state.notification.values.
      find((e) => e.name === props.match.params.name && e.owner === props.match.params.owner),
  }),
  (dispatch) => ({
    clickReload: (owner, name) =>
      dispatch({type: "REPOSITORY_CLICK_RELOAD", payload: {owner, name}}),
    handleClickIssue: ({owner, name, number}) =>
      dispatch({type: "LOAD_ISSSUE", payload: {owner, name, number}}),
    handleClickPullRequest: ({owner, name, number}) =>
      dispatch({type: "LOAD_PULL_REQUEST", payload: {owner, name, number}}),
  })
)(Repository);
