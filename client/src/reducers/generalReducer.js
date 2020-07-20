const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_GROUP':
      return {
        groups: [...state.groups, ...action.payload.data],
        basket: [...state.basket],
        error: undefined,
      };
    case 'FETCH_GROUPS':
      return {
        groups: [...state.groups, ...action.payload.data],
        basket: [...state.basket],
        error: undefined,
      };
    case 'ERROR':
      return {
        groups: [...state.groups],
        basket: [...state.basket],
        error: action.payload[0],
      };
    default:
      return state;
  }
};
export default reducer;
