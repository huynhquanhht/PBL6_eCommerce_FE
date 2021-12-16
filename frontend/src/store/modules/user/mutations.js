const mutations = {
  'SET_USER_INFO': (state, userInfo) => {
    state.userInfo = userInfo;
  },
  'SET_ALL_USERS': (state, allUsers) => {
    state.allUsers = allUsers;
  },
  'SET_EACH_USER': (state, eachUser) => {
    state.eachUser = eachUser;
  },
};

export default mutations;