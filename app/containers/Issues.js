import {connect} from 'react-redux';
import {findRepositoryFromMatch} from './../utils/findRepository.js';
import Issues from './../components/Issues.js.jsx';

export default connect(
  (state, props) => ({
    ...findRepositoryFromMatch(state, props.match).issues,
    repositoryName: props.match.params.name,
    repositoryOwner: props.match.params.owner,
  }),
  (dispatch) => ({
    handleClickIssue: ({owner, name, number}) =>
      dispatch({type: "LOAD_ISSSUE", payload: {owner, name, number}}),
  })
)(Issues);
