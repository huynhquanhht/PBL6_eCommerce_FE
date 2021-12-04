import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import account from '@/store/modules/account';
import user from '@/store/modules/user';
import product from '@/store/modules/product';
import cart from '@/store/modules/cart'
import order from '@/store/modules/order'
import shop from '@/store/modules/shop'
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    account,
    user,
    product,
    cart,
    order, 
    shop
  }
});
