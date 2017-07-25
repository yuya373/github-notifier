const initState = (savedState) => ({
  values: [],
  config: {
    interval: savedState ? savedState.config.interval : (1000 * 60),
  },
});

const stopTimer = (values, name, owner) => {
  const old = values.find((e) => e.name === name && e.owner === owner);
  if (old && old.timer) {
    window.clearInterval(old.timer);
  }
};

const dispatchEvent = (name, owner) => window.store.dispatch({
  type: "TIMER_FETCH_REPOSITORY",
  payload: {
    name,
    owner
  },
});

const startTimer = (state, name, owner) => window.setInterval(
  () => dispatchEvent(name, owner),
  getInterval(state)
);


const getInterval = (state) => state.config.interval;

const handleStartWatch = (state, {name, owner}) => {
  const {values} = state;

  stopTimer(values, name, owner);

  return {
    ...state,
    values: values.filter((e) => !(e.name === name && e.owner === owner)).concat([{
      name,
      owner,
      timer: startTimer(state, name, owner),
    }]),
  };
};

const handleStopWatch = (state, {name, owner}) => {
  const {values} = state;
  stopTimer(values, name, owner);

  return {
    ...state,
    values: values.filter((e) => e.name !== name && e.owner !== owner),
  };
};

const updateConfig = (state, {timers, config}) => {
  const {values} = state;
  values.forEach((e) => e && window.clearInterval(e.timer));

  return {
    ...state,
    values: timers,
    config,
  };
};

export default function(state, action, savedState) {
  if (!state) state = initState(savedState);

  switch(action.type) {
  case 'TIMER_CONFIG_CHANGED':
    return updateConfig(state, action.payload);
  case "TIMERS_START_TIMER":
    return handleStartWatch(state, action.payload);
  case "TIMERS_STOP_TIMER":
    return handleStopWatch(state, action.payload);
  default:
    return state;
  }
}
