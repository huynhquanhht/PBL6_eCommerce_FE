const mutations =  {
  'SET_PRODUCTS_PAYMENT': (state, productsPayment) => {
    state.productsPayment = productsPayment;
  },
  'SET_ORDER': (state, order) => {
    state.order = order;
  },
  'SET_ORDERS': (state, orders) => {
    state.orders = orders;
  }
};

export default mutations;