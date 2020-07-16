const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_GROUP':
      return {
        groups: [...state.groups, action.payload],
        basket: [...state.basket],
      };
    default:
      return state;
  }
};
export default reducer;
