const initialState = {
  value: "",
};

export default function(state = initialState, action) {
  switch(action.type) {
  case "TOKEN_CHANGED":
    return {...state, value: action.payload.token};
  default:
    return state;
  }
}
