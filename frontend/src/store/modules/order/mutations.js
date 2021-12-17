const mutations =  {
  'SET_PRODUCTS_PAYMENT': (state, productsPayment) => {
    state.productsPayment = productsPayment;
  },
  'SET_ORDER': (state, order) => {
    state.order = order;
  },
  'SET_ORDERS': (state, orders) => {
    state.orders = orders;
  },
  'SET_ALL_ORDERS': (state, allOrders) => {
    state.allOrders = allOrders;
  },
};

export default mutations;