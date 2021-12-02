const mutations = {
  'SET_ALL_PRODUCTS': (state, allProducts) => {
    state.allProducts = allProducts;
  },
  'SET_PRODUCT_DETAIL': (state, productDetail) => {
    state.productDetail = productDetail;
  }
};

export default mutations;