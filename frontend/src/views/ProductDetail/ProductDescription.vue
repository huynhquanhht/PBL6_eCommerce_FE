<template>
  <div class="production-description-wrapper">
    <div class="title-header">
      <p>Mô tả sản phẩm</p>
    </div>
    <div class="product-description">
      <p>{{ productDescription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDescription',
  props: {
    productDescription: { type: String },
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
}
.production-description-wrapper {
  width: 1200px;
  padding: 16px 20px;
  background-color: #ffffff;
  margin-top: 10px;
}
.title-header {
  background-color: #f5f5f5;
  height: 40px;
  display: flex;
  align-items: center;
}

.title-header p {
  font: 500 14px Roboto;
  color: #616161;
  text-transform: uppercase;
  margin-left: 10px;
}
.product-description {
  padding: 8px 10px 10px 10px;
}

.product-description p {
  font: 300 14px Roboto;
  color: #000000;
  line-height: 18px;
  text-align: justify;
}
</style>
