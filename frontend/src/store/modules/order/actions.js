import {
  orderCart,
  getOrders,
  getShopOrders,
  cancelShopOrder,
  getOrderById,
  getAllOrders,
} from '@/api/api_order';
const actions = {
  'ORDER_CART': async (context, order) => {
    try {
      await orderCart(order);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Đặt hàng thành công',
      });
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return false;
      }
    }
  },
  'FETCH_ORDERS': async (context, state) => {
    try {
      let res = await getOrders(state);
      context.commit('SET_ORDERS', res.data.resultObj);
    } catch (error) {
      context.commit('SET_SNACKBAR', {
        type: 'error',
        visible: true,
        text: error.response.data,
      });
    }
  },
  'FETCH_ORDER_BY_ID': async(context, order) => {
    try {
      let res = await getOrderById(order.id);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Không có dữ liệu chi tiết đơn hàng',
        });
        return;
      }
      context.commit('SET_ORDER', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
      }
    }
  },
  'FETCH_SHOP_ORDERS': async (context, state) => {
    try {
      let res = await getShopOrders(state);
      context.commit('SET_ORDERS', res.data.resultObj);
    } catch (error) {
      context.commit('SET_SNACKBAR', {
        type: 'error',
        visible: true,
        text: error.response.data,
      });
    }
  },
  'CANCEL_SHOP_ORDER': async (context, order) => {
    try {
      await cancelShopOrder(order);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Hủy đơn hàng thành công',
      });
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
      }
      return false;
    }
  },
  'ACT_GET_ALL_ORDERS' : async (context, payload) => {
    try {
      let res = await getAllOrders(payload.fromDate, payload.toDate);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Không có dữ liệu đơn hàng',
        });
      }
      console.log(res.data.resultObj);
      context.commit('SET_ALL_ORDERS', res.data.resultObj);
      
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
      }
      return false;
    }
  }
};

export default actions;