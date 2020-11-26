export const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'DISPLAY_USERS') {
    return { ...state, loading: false, users: action.payload };
  }
  if (action.type === 'NEXT_PAGE') {
    const lastUser = state.users[state.users.length - 1];
    const lastUserId = lastUser.id;
    return { ...state, page: lastUserId };
  }
  return state;
};