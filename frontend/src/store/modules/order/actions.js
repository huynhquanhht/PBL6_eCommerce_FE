import {orderCart, getOrders} from '@/api/api_order';
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
      console.log(state);
      let res = await getOrders(state);
      context.commit('SET_ORDERS', res.data.resultObj);
    } catch (error) {
      context.commit('SET_SNACKBAR', {
        type: 'error',
        visible: true,
        text: error.response.data,
      });
    }
  }
};

export default actions;