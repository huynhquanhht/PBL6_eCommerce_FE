<<<<<<< Updated upstream
import {registerShop, getShopInfo} from '@/api/api_shop';
import router from '@/router'
=======
import {
  registerShop, 
  getShopInfo,
  getAllShops,
  getShopById,
  disableShop,
  enableShop,
  updateShop,
} from '@/api/api_shop';
>>>>>>> Stashed changes
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
  },
  'ACT_GET_ALL_SHOPS': async (context, payload) => {
    try {
      const res = await getAllShops(payload.name);
      if(res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Hiện không có dữ liệu để hiển thị'
        })
      }
      context.commit('SET_ALL_SHOPS', res.data.resultObj);''
    } 
    catch (error){
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data
        });
      }
    }
  },
  'ACT_GET_EACH_SHOP': async (context, shopId) => {
    try {
      const res = await getShopById(shopId);
      context.commit('SET_EACH_SHOP', res.data.resultObj);
    } catch (error) {
      console.log(error);
    }
  },
  'ACT_DISABLE_SHOP' :async (context, shopInfo) => {
    try {
      console.log('ShopDisable', shopInfo);
      await disableShop(shopInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Cửa hàng này đã bị vô hiệu hóa thành công',
      });
    }
    catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  'ACT_ENABLE_SHOP' : async (context, payload) => {
    try {
      console.log('Shop Enable', payload.shopId);
      await enableShop(payload.shopId);
      context.commit('SET_SNACKBAR' , {
        type: 'success',
        visible: true,
        text: 'Cửa hàng này đã được Ân xá thành công'
      });
    
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  'ACT_UPDATE_SHOP' : async (context, payload) => {
    try {
      await updateShop(payload.shopId, payload.shopInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Cập nhật thông tin cửa hàng thành công'
      });
     
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
};

export default actions;