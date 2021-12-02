import { getAllProducts, getProductDetail } from "@/api/api_product";

const actions = {
  'ACT_GET_ALL_PRODUCTS': async (context, payload) => {
    try {
      const res = await getAllProducts(payload.pageIndex, payload.pageSize);
      context.commit('SET_ALL_PRODUCTS', res.data.resultObj.items);
    } catch (error) {
      console.log(error);
    }
  },
  'FETCH_PRODUCT_DETAIL': async(context, payload) => {
    try {
      const res = await getProductDetail(payload.id);
      context.commit('SET_PRODUCT_DETAIL', res.data);
    } catch(error) {
      console.log(error);
    }
  }
};

export default actions;