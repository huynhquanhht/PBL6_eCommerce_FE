import { getAllProducts, getProductDetail } from "@/api/api_product";

const actions = {
  'ACT_GET_ALL_PRODUCTS': async (context, payload) => {
    try {
      const res = await getAllProducts(payload.pageIndex, payload.pageSize);
      context.commit('SET_ALL_PRODUCTS', res.data.resultObj.items);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Không có dữ liệu sản phẩm',
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: error.response.data,
        });
      }
    }
  },
  'FETCH_PRODUCT_DETAIL': async(context, payload) => {
    try {
      const res = await getProductDetail(payload.id);
      context.commit('SET_PRODUCT_DETAIL', res.data);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Không có dữ liệu sản phẩm',
        });
      }
    } catch(error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: error.response.data,
        });
      }
    }
  }
};

export default actions;