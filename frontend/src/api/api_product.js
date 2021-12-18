import { getRequest, postRequest, putRequest } from '@/utils/utils-api';

const getAllProducts = (pageIndex, pageSize) => {
  return getRequest(
    `Products/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`
  );
};

const getAllProductsShop = (pageIndex, pageSize) => {
  return getRequest(
    `Products/paging/manage?PageIndex=${pageIndex}&PageSize=${pageSize}`
  );
};

const getProductDetail = (id) => {
  return getRequest(`Products/${id}`);
};

const create = (productInfo) => {
  for (var pair of productInfo.entries()) {
    console.log(pair);
  }
  return postRequest(`Products`, productInfo);
};

const update = (productInfo) => {
  for (var pair of productInfo.entries()) {
    console.log(pair);
  }
  return putRequest(`Products`, productInfo);
};

const getAllProductsAdmin = (pageIndex, pageSize, keyWord) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}
  &PageSize=${pageSize}&Keyword=${keyWord}`);
};

const getTotalProducts = (pageIndex, pageSize, keyword, gender) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}
  &PageSize=${pageSize}&Keyword=${keyword}&Gender=${gender}`);
};

export {
  getAllProducts,
  getProductDetail,
  getAllProductsAdmin,
  getAllProductsShop,
  getTotalProducts,
  create,
  update
};
