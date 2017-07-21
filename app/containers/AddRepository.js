import {connect} from 'react-redux';
import AddRepository from './../components/AddRepository.js.jsx';

export default connect(
  (state) => ({
    form: state.addRepository.form,
    values: state.addRepository.values,
    success: state.addRepository.success,
    error: state.addRepository.error,
    fetching: state.addRepository.fetching,
  }),
  (dispatch) => ({
    onAdd: () => dispatch({type: "ADD_REPOSITORY_ON_ADD"}),
    onOwnerChange: (value) => dispatch({
      type: "ADD_REPOSITORY_ON_OWNER_CHANGE",
      payload: {value},
    }),
    onNameChange: (value) => dispatch({
      type: "ADD_REPOSITORY_ON_NAME_CHANGE",
      payload: {value},
    }),
  })
)(AddRepository);

