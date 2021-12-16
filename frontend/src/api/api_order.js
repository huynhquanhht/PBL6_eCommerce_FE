import {getRequest, postRequest, deleteRequest} from '@/utils/utils-api';

const orderCart = (order) => {
  return postRequest(`Orders`, order);
}

const getOrders = (state) => {
  if (state === 'Tất cả') {
    return getRequest(`Orders/me`);
  } 
  return getRequest(`Orders/me?state=${state}`);
}
<<<<<<< HEAD
<<<<<<< Updated upstream
export {orderCart, getOrders}
=======
=======
>>>>>>> a607ff66f13d62cdd72e3b4f8f10cebd50d58198

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
<<<<<<< HEAD

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
}
>>>>>>> Stashed changes
=======
export {orderCart, getOrders, getShopOrders, cancelShopOrder, getOrderById}
>>>>>>> a607ff66f13d62cdd72e3b4f8f10cebd50d58198
