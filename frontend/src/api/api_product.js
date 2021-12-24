import { getRequest, postRequest, putRequest, deleteRequest } from '@/utils/utils-api';

const getAllProducts = (pageIndex, pageSize) => {
  return getRequest(
    `Products/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`
  );
};

const getAllProductsShop = (pageIndex, pageSize, keyWord) => {
  return getRequest(
    `Products/paging/manage?PageIndex=${pageIndex}
    &PageSize=${pageSize}&Keyword=${keyWord}`
  );
};

const getProductDetail = (id) => {
  return getRequest(`Products/${id}`);
};

const create = (productInfo) => {
  return postRequest(`Products`, productInfo);
};

const update = (productInfo) => {
  return putRequest(`Products`, productInfo);
};

const deleteProduct = (productId) => {
  return deleteRequest(`Products?productId=${productId}`);
}

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
  update,
  deleteProduct
};
