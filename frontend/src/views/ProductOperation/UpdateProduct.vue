<template>
  <div class="update-product-wrapper">
    <div class="update-product-title">
      <p class="main-title">Cập nhật sản phẩm</p>
    </div>
    <hr class="update-product-hr" />
    <div class="product-form">
    <product-form :actionType="actionType" :productDetail="productDetail"
      @update-product="update"
    ></product-form>
    </div>

  </div>
</template>

<script>
import ProductForm from './ProductForm.vue';
import {mapGetters, mapActions} from 'vuex';
export default {
  components: { ProductForm },
  name: 'UpdateProduct',
  props: {
    id: {type: Number}
  },
  data() {
    return {
      actionType: 'Update',
    };
  },
  methods: {
    ...mapActions({
     fetchProductDetail: 'FETCH_PRODUCT_DETAIL',
     updateProduct: 'UPDATE_PRODUCT'
    }),
    async update(productInfo) {
      let res = await this.updateProduct(productInfo);
      if (res) {
        this.$router.push('/shop-chanel/product-list');
      }
    }
  },
  computed: {
    ...mapGetters({
      productDetail: 'GET_PRODUCT_DETAIL',
    })
  },
  async created() {
    await this.fetchProductDetail({ id: this.id });
  }
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px !important;
}
.update-product-wrapper {
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;
}
.main-title {
  text-transform: uppercase;
  font: 600 16px Roboto;
  color: #616161;
  padding: 6px 0px;
}

.update-product-hr {
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
  color: #616161;
  margin: 5px 0px;
}
.product-form {
display: flex;
flex-direction: column;
align-items: center;
}
</style>
