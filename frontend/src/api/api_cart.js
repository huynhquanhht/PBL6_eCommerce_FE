import {getRequest, postRequest, patchRequest, deleteRequest} from '@/utils/utils-api';

const getQuantity = () => {
  return getRequest(`Carts/count`);
}

const getCartItems = () => {
  return getRequest('Carts/me');
}

const addCartItem = (cartItem) => {
  return postRequest('Carts', cartItem);
}

const updateCartQuantity = (cart) => {
  return patchRequest('Carts', cart);
}

const deleteCartItem = (cartId) => {
  return deleteRequest(`Carts/${cartId}`)
}

export {getQuantity, getCartItems, addCartItem, updateCartQuantity, deleteCartItem}