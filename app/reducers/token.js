const initialState = (savedState) => ({
  value: savedState.value,
});

export default function(state, action, savedState) {
  if (!state) state = initialState(savedState);

  switch(action.type) {
  case "TOKEN_CHANGED":
    return {...state, value: action.payload.token};
  default:
    return state;
  }
}
