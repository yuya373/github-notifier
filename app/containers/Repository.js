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
  }),
  (dispatch) => ({
    clickReload: (owner, name) => dispatch({type: "REPOSITORY_CLICK_RELOAD", payload: {owner, name}})
  })
)(Repository);
