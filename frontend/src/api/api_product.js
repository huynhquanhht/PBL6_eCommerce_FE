import {getRequest} from '@/utils/utils-api';

const getAllProducts = (pageIndex, pageSize) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`);
}

const getProductDetail = (id) => {
  return getRequest(`Products/${id}`);
}

const getAllProductsAdmin = (pageIndex, pageSize, keyWord) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}
  &PageSize=${pageSize}&Keyword=${keyWord}`);
}

const getTotalProducts = (pageIndex, pageSize, keyword, gender) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}
  &PageSize=${pageSize}&Keyword=${keyword}&Gender=${gender}`);
}

export {
  getAllProducts,
  getProductDetail,
  getAllProductsAdmin,
  getTotalProducts,
  
}