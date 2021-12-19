<template>
  <div class="product-cart-wrapper">
    <div class="product-cart">
      <div class="product-img-name">
        <div class="product-img">
          <img :src="'http://c64e-2402-800-6205-3e19-cd35-9f68-4158-e6ba.ngrok.io/apigateway/Products' + product.img" alt="" />
        </div>
        <div class="product-name">
          <p>{{ product.name }}</p>
          <p>(Màu: Đỏ - Kích thước: XXL)</p>
          <!-- <p>Tuấn's Shop</p> -->
        </div>
      </div>
      <div class="product-price">
        <p>{{ product.price.toLocaleString('it-IT') }} đ</p>
      </div>
      <div class="product-quantity">
        <p> {{ product.quantity }}</p>
      </div>
      <div class="product-to-money">
        <p>{{ (product.price * product.quantity).toLocaleString('it-IT') }} đ</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrderCard',
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
}
.product-cart-wrapper {
  width: 900px;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-top: 5px;
}
.product-cart {
  display: grid;
  grid-template-columns: 600px 140px 140px 140px;
  align-items: center;
  justify-items: center;
}

.checkbox {
  height: 18px;
}
.checkbox input {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.product-img-name {
  display: flex;
  align-items: center;
  column-gap: 10px;
  justify-self: start;
  padding: 0px 20px;
}

.product-img {
  height: 68px;
}

.product-img img {
  width: 68px;
  height: 68px;
}

.product-name p,
.product-price p,
.product-to-money p {
  font: 400 15px Roboto;
}

.btn-delete {
  width: 44px;
  height: 44px;
}
</style>
