import {postRequest} from '@/utils/utils-api';

const orderCart = (order) => {
  return postRequest(`Orders`, order);
}

export {orderCart}