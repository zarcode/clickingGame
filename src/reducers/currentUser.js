export default (state = 'default', action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.username;

    default:
      return state;
  }
};
