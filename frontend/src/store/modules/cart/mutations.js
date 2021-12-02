const mutations = {
  'SET_CART_QUANTITY': (state, cartQuantity) => {
    state.cartQuantity = cartQuantity;
  },
  'SET_CART_ITEMS': (state, cartItems) => {
    state.cartItems = cartItems;
  },
  'SET_CHANGE_QUANTITY_RESULT': (state, result) => {
    state.isChangeQuantitySuccess = result;
  },
  'SET_ADD_RESULT': (state, result) => {
    state.isAddSuccess = result;
  },
};

export default mutations;