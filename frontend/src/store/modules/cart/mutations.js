const mutations = {
  'SET_CART_QUANTITY': (state, cartQuantity) => {
    state.cartQuantity = cartQuantity;
  },
  'SET_CART_ITEMS': (state, cartItems) => {
    state.cartItems = cartItems;
  },
  'SET_ADD_RESULT': (state, result) => {
    state.isAddSuccess = result;
  },
};

export default mutations;