const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.response.data[0].username,
        errormsg: undefined,
      };
    default:
      return state;
  }
};
export default reducer;
