const getters = {
  'GET_CART_QUANTITY': state => state.cartQuantity,
  'GET_CART_ITEMS': state => state.cartItems,
  'GET_ADD_RESULT': state => state.isAddSuccess,
};

export default getters;