const storageMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  return result;
}

export default storageMiddleware;
