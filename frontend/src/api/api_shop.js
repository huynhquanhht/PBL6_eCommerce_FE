import {
  getRequest, 
  postRequest, 
  putRequest,
  patchRequest,
} from '@/utils/utils-api';

const registerShop = (shopInfo) => {
  return postRequest(`Shops`, shopInfo);
}

const getShopInfo = () => {
  return getRequest(`Shops/me`)
}

const getAllShops = (name) => {
  return getRequest(`Shops?name=${name}`);
}

const getShopById = (shopId) => {
  return getRequest(`Shops/${shopId}`);
}

const updateShop = (shopInfo) => {
  return putRequest(`Shops`, shopInfo);
}

const disableShop = (disableInfo) => {
  return patchRequest(`Shops/Disable`, disableInfo);
}

const enableShop = (shopId) => {
  return patchRequest(`Shops/Enable?shopId=${shopId}`);
}

export {
  registerShop,
  getShopInfo,
  getAllShops,
  getShopById,
  disableShop,
  enableShop,
  updateShop,
}
