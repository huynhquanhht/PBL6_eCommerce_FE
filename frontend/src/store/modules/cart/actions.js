import {
  getQuantity,
  getCartItems,
  addCartItem,
  updateCartQuantity,
  deleteCartItem,
} from '@/api/api_cart';
const actions = {
  FETCH_CART_QUANTITY: async (context) => {
    try {
      let res = await getQuantity();
      context.commit('SET_CART_QUANTITY', res.data.resultObj);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Không có dữ liệu số lượng sản phẩm trong giỏ hàng',
        });
      }
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
  FETCH_CART_ITEMS: async (context) => {
    try {
      let res = await getCartItems();
      if (res.status === 204) {
        context.commit('SET_CART_ITEMS', []);
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Giỏ hàng trống',
        });
        return;
      }
      context.commit('SET_CART_ITEMS', res.data.resultObj);
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
  ADD_CART_ITEM: async (context, cartItem) => {
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
          text: error.response.data,
        });
        context.commit('SET_ADD_RESULT', false);
      }
    }
  },
  UPDATE_CART_QUANTITY: async (context, cart) => {
    try {
      await updateCartQuantity(cart);
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Quá số lượng tồn kho! Không thể tăng thêm',
        });
        return false;
      }
    }
  },
  DELETE_CART_ITEM: async (context, cartId) => {
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
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'success',
          visible: true,
          text: 'Xóa sản phẩm khỏi giỏ hàng thất bại',
        });
      }
    }
  },
};

export default actions;
