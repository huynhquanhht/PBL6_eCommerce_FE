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
  'SET_SHOP_PRODUCT_BY_ID': (state, shopProduct) => {
    state.shopProduct = shopProduct;
  }
};

export default mutations;