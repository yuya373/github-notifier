import {connect} from 'react-redux';
import PullRequests from './../components/PullRequests.js.jsx';
import {findRepositoryFromMatch} from './../utils/findRepository.js';


export default connect(
  (state, props) => ({
    ...findRepositoryFromMatch(state, props.match).pullRequests,
    repositoryName: props.match.params.name,
    repositoryOwner: props.match.params.owner,
  }),
  (dispatch) => ({
    handleClickPullRequest: ({owner, name, number}) =>
      dispatch({type: "LOAD_PULL_REQUEST", payload: {owner, name, number}}),
  })
)(PullRequests);
