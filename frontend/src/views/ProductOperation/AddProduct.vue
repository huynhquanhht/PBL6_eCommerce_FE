<template>
  <div class="add-product-wrapper">
    <div class="add-product-title">
      <p class="main-title">Thêm sản phẩm</p>
    </div>
    <hr class="add-product-hr">
    <product-form :actionType="actionType"
      @create-product="create"
    ></product-form>
  </div>
</template>

<script>
import ProductForm from './ProductForm.vue'
import {mapActions} from 'vuex';
export default {
  components: { ProductForm },
  name: 'AddProduct',
  data() {
    return {
      actionType: 'Create'
    }
  },
  methods: {
    ...mapActions({
      createProduct: 'CREATE_PRODUCT'
    }),
    async create(productInfo) {
      let res = await this.createProduct(productInfo);
      if (res) {
        this.$router.push('/shop-chanel/product-list');
      }
    }
  }
}
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px !important;
}
.add-product-wrapper {
  /* margin-top: 10px; */
  padding: 10px 20px 10px 20px;
}
.main-title {
  text-transform: uppercase;
  font: 600 16px Roboto;
  color: #616161;
  padding: 6px 0px;
}

.add-product-hr {
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
  color: #616161;
  margin: 5px 0px;
}
</style>