const mutations =  {
  'SET_PRODUCTS_PAYMENT': (state, productsPayment) => {
    state.productsPayment = productsPayment;
  },
  'SET_ORDERS': (state, orders) => {
    state.orders = orders;
  }
};

export default mutations;