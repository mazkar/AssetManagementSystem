export const setToken = payload => {
  return {
    type: 'SET_TOKEN',
    payload,
  };
};

export const resetReducer = payload => {
  return {
    type: 'RESET_REDUCER',
    payload,
  };
};
