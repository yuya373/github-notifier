export default (error) => {
  const {message, documentation_url} = error.response.data;

  return ({
    success: false,
    error: new Error(`${message}`),
  });
};
