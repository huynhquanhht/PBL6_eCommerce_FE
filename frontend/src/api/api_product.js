import {getRequest, postRequest} from '@/utils/utils-api';

const getAllProducts = (pageIndex, pageSize) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`);
}

const getAllProductsShop = (pageIndex, pageSize) => {
  return getRequest(`Products/paging/manage?PageIndex=${pageIndex}&PageSize=${pageSize}`);
}

const getProductDetail = (id) => {
  return getRequest(`Products/${id}`);
}

const create = (productInfo) => {
  for (var pair of productInfo.entries()){
    console.log(pair);
  }
  return postRequest(`Products`, productInfo);
}

export {getAllProducts, getProductDetail, create, getAllProductsShop}