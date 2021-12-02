import {getQuantity, getCartItems, addCartItem, updateCartQuantity, deleteCartItem} from '@/api/api_cart';
import router from '@/router'
const actions = {
  'FETCH_CART_QUANTITY': async (context) => {
    try {
      let res = await getQuantity();
      context.commit('SET_CART_QUANTITY', res.data.resultObj);
    } catch(error) {
      console.log(error);
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
  'FETCH_CART_ITEMS': async (context) => {
    try {
      let res = await getCartItems();
      context.commit('SET_CART_ITEMS', res.data.resultObj);
      if (res.status === 204) {
        context.commit('SET_CART_ITEMS', []);
      }
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
  'ADD_CART_ITEM': async (context, cartItem) => {
    try {
      await addCartItem(cartItem);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Thêm vào giỏ hàng thành công.',
      });
      context.commit('SET_ADD_RESULT', true);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Thêm vào giỏ hàng thất bại. Quá số lượng tồn kho.',
        });
        context.commit('SET_ADD_RESULT', false);
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
  },
  'UPDATE_CART_QUANTITY': async (context, cart) => {
    try {
       await updateCartQuantity(cart);
       context.commit('SET_CHANGE_QUANTITY_RESULT', true);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Quá số lượng tồn kho! Không thể tăng thêm',
        });
        context.commit('SET_CHANGE_QUANTITY_RESULT', false);
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
  },
  'DELETE_CART_ITEM': async (context, cartId) => {
    try {
      let res = await deleteCartItem(cartId);
      if (res.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Xóa sản phẩm khỏi giỏ hàng thất bại',
        });
      }
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Xóa sản phẩm khỏi giỏ hàng thành công',
      });
    } catch (error) {
      if (error.response.status === 401) {
        router.push({name: 'error401'}); 
        return;
      }
      if (error.response.status === 500) {
        router.push({name: 'error500'}); 
        return;
      }
      this.setSnackbar({
        type: 'error',
        text: 'Xóa sản phẩm khỏi giỏ hàng thất bại',
        visible: true,
      });
    }
  }
};

export default actions;