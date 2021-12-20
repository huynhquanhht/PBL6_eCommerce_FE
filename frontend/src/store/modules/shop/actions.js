import {
  registerShop, 
  getShopInfo,
  getAllShops,
  getShopById,
  disableShop,
  enableShop,
  updateShop,
} from '@/api/api_shop';
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
  'UPDATE_SHOP': async (context, shopInfo) => {{
    try {
      console.log('updateShop');
      await updateShop(shopInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Cập nhật cửa hàng thành công'
      });
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data
        });
        return;
      }
      return false;
    }
  }},
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
      if (error.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data
        });
      }
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