<template>
  <div class="wrapper">
    <div class="product-list">
      <div class="product" v-for="(product, index) in productList" :key="index">
        <product-card
          :imgUrl="'http://81b1-2402-800-6205-3e19-302d-c6f5-cab2-c66f.ngrok.io/apigateway/Products' + product.thumbnailImage"
          :productId="product.id"
          :productName="product.name"
          :productPrice="product.price"
          :productViews="product.viewCount"
        ></product-card>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
export default {
  name: 'ProductCardList',
  components: { ProductCard },
  props: {
    productList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.product-list {
  margin-left: 8px;
  width: 1200px;
  display: grid;
  grid-template-columns: 180px 180px 180px 180px 180px 180px;
  column-gap: 20px;
  row-gap: 10px;
  margin-top: 10px;
}
</style>
