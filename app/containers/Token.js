import { connect } from 'react-redux';
import Token from './../components/Token.js.jsx';

export default connect(
  (state) => ({
    token: state.token.value,
  }),
  (dispatch) => ({
    onChange: (token) => dispatch({type: 'TOKEN_CHANGED', payload: { token }}),
  })
)(Token);
