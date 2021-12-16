const getters = {
  GET_CURRENT_USER: (state) => state.currentUser,
  GET_CHECK_USERNAME: (state) => state.isExistedUsername,
  GET_CHECK_EMAIL: (state) => state.isExistedEmail,
  GET_CHECK_PHONE: (state) => state.isExistedPhone,
};

export default getters;
