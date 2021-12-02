const mutations = {
  'SET_CURRENT_USER': (state, loginResult) => {
    state.currentUser = loginResult;
  }
};

export default mutations;