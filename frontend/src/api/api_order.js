import {getRequest, postRequest, patchRequest, deleteRequest} from '@/utils/utils-api';

const orderCart = (order) => {
  return postRequest(`Orders`, order);
}

const getOrders = (state) => {
  if (state === 'Tất cả') {
    return getRequest(`Orders/me`);
  } 
  return getRequest(`Orders/me?state=${state}`);
}

const getOrderById = (orderId) => {
  return getRequest(`Orders/${orderId}`);
}

const getShopOrders = (state) => {
  if (state === 'Tất cả') {
    return getRequest(`Orders/shop`);
  } 
  return getRequest(`Orders/shop?state=${state}`);
}

const cancelShopOrder = (order) => {
  return deleteRequest(`Orders/shop`, order);
}

const confirmOrder = (orderId) => {
  return patchRequest(`Orders/shop?orderId=${orderId}`);
}

const getAllOrders = (fromDate, toDate) => {
  return getRequest(`Orders/all?formDate=${fromDate}&toDate=${toDate}`);
}

export {
  orderCart, 
  getOrders, 
  getShopOrders, 
  cancelShopOrder, 
  getOrderById,
  getAllOrders,
  confirmOrder
}
