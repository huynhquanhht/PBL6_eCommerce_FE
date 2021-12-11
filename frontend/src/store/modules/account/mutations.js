const mutations = {
  'SET_CURRENT_USER': (state, loginResult) => {
    state.currentUser = loginResult;
  },
  'SET_CHECK_USERNAME': (state, isExistedUsername) => {
    state.isExistedUsername = isExistedUsername;
  },
  'SET_CHECK_EMAIL': (state, isExistedEmail) => {
    state.isExistedEmail = isExistedEmail;
  },
  'SET_CHECK_PHONE': (state, isExistedPhone) => {
    state.isExistedPhone = isExistedPhone;
  },
};

export default mutations;