import {getRequest, postRequest} from '@/utils/utils-api';

const orderCart = (order) => {
  return postRequest(`Orders`, order);
}

const getOrders = (state) => {
  if (state === 'Tất cả') {
    return getRequest(`Orders/me`);
  } 
  return getRequest(`Orders/me?state=${state}`);
}
export {orderCart, getOrders}