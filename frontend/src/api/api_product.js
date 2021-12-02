import {getRequest} from '@/utils/utils-api';

const getAllProducts = (pageIndex, pageSize) => {
  return getRequest(`Products/paging?PageIndex=${pageIndex}&PageSize=${pageSize}`);
}

const getProductDetail = (id) => {
  console.log(id);
  return getRequest(`Products/${id}`);
}

export {getAllProducts, getProductDetail}