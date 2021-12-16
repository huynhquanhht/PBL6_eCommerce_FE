const mutations = {
  'SET_ALL_PRODUCTS': (state, allProducts) => {
    state.allProducts = allProducts;
  },
  'SET_PRODUCT_DETAIL': (state, productDetail) => {
    state.productDetail = productDetail;
  },
  'SET_TOTAL_PRODUCTS':(state, totalProducts) => {
    state.totalProducts = totalProducts;
  },
};

export default mutations;