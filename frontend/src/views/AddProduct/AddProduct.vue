<template>
  <div class="add-product-wrapper">
    <div class="add-product-title">
      <p class="main-title">Thêm sản phẩm</p>
    </div>
    <hr class="add-product-hr">
    <add-product-form></add-product-form>
  </div>
</template>

<script>
import AddProductForm from './AddProductForm.vue'
export default {
  components: { AddProductForm },
  name: 'AddProduct'
}
</script>

<style>
.v-application p {
    margin-bottom: 0px !important;
}
.add-product-wrapper {
  margin-top: 10px;
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