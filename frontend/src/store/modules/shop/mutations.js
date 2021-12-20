const mutations = {
  'SET_SHOP_INFO': (state, shopInfo) => {
    state.shopInfo = shopInfo
  },
  'SET_ALL_SHOPS': (state, allShops) => {
    state.allShops = allShops
  },
  'SET_EACH_SHOP': (state, eachShop) => {
    state.eachShop = eachShop
  },
};

export default mutations;