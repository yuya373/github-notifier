const initialState = (savedState) => ({
  form: {
    owner: "",
    name: "",
    ...savedState.form,
  },
  fetching: false,
  success: false,
  error: "",
});

export default function(state, action, savedState) {
  if (!state) state = initialState(savedState || {});

  switch(action.type) {
  case "ADD_REPOSITORY_ON_OWNER_CHANGE":
    return {
      ...state,
      form: {...state.form, owner: action.payload.value},
      error: "",
      success: false,
    };
  case "ADD_REPOSITORY_ON_NAME_CHANGE":
    return {
      ...state,
      form: {...state.form, name: action.payload.value},
      error: "",
      success: false,
    };
  case "ADD_REPOSITORY_FETCH_START":
    return {
      ...state,
      fetching: true,
      success: false,
      error: "",
    };
  case "ADD_REPOSITORY_FETCH_SUCCESS":
    return {
      ...state,
      fetching: false,
      success: true,
    };
  case "ADD_REPOSITORY_FETCH_FAILED":
    return {
      ...state,
      fetching: false,
      success: false,
      error: action.payload,
    };
  default:
    return state;
  }
}
