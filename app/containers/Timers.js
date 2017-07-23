import {connect} from 'react-redux';
import Timers from './../components/Timers.js.jsx';

export default connect(
  (state) => ({
    values: state.timers.values,
    config: state.timers.config,
    repositories: state.repositories.ids,
  }),
  (dispatch) => ({
    changeInterval: (interval) =>
      dispatch({type: "TIMERS_CHANGE_INTERVAL", payload: {interval}}),
    clickStartTimer: ({name, owner}) =>
      dispatch({type: "TIMERS_START_TIMER", payload: {name, owner}}),
    clickStopTimer: ({name, owner}) =>
      dispatch({type: "TIMERS_STOP_TIMER", payload: {name, owner}}),
  })
)(Timers);
