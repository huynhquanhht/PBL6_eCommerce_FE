import {orderCart} from '@/api/api_order';
import router from '@/router'
const actions = {
  'ORDER_CART': async (context, order) => {
    try {
       let res =await  orderCart(order);
       console.log(res);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Đặt hàng thành công',
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Đặt hàng thất bại. Vui lòng thử lại',
        });
        return;
      }
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