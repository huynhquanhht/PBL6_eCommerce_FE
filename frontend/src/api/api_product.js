import {getRequest} from '@/utils/utils-api';

const getAllProducts = (pageIndex, pageSize) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`);
}

const getProductDetail = (id) => {
  return getRequest(`Products/${id}`);
}

export {getAllProducts, getProductDetail}