import {registerShop, getShopInfo} from '@/api/api_shop';
import router from '@/router'
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
      // Chưa đăng ký shop
      if (res.status === 204) {
        return;
      }
      // Đã đăng ký shop
      context.commit('SET_SHOP_INFO', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 401) {
        router.push({name: 'error401'}); 
        return;
      }
      if (error.response.status === 500) {
        router.push({name: 'error500'}); 
        return;
      }
      router.push({name: 'other-error'}); 
    }
  }

};

export default actions;