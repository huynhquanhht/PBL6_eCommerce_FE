import {orderCart} from '@/api/api_order';
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
  }
};

export default actions;