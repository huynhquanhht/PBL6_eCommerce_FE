import {registerShop, getShopInfo} from '@/api/api_shop';
const actions = {
  'REGISTER_SHOP': async (context, shopInfo) => {
    try {
      await registerShop(shopInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Đăng ký cửa hàng thành công'
      });
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Đăng ký cửa hàng thất bại'
        });
        return;
      }
    }
  },
  'FETCH_SHOP_INFO': async (context) => {
    try {
      let res = await getShopInfo();
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'success',
          visible: true,
          text: 'Bạn chưa đăng ký cửa hàng'
        });
      }
      context.commit('SET_SHOP_INFO', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data
        });
      }
    }
  }

};

export default actions;