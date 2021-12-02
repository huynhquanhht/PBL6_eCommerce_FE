import {getRequest, postRequest} from '@/utils/utils-api';

const registerShop = (shopInfo) => {
  return postRequest(`Shops`, shopInfo);
}

const getShopInfo = () => {
  return getRequest(`Shops/me`)
}


export {
  registerShop,
  getShopInfo
}
