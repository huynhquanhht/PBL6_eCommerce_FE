<template>
  <div class="product-cart-wrapper">
    <div class="product-cart">
      <div class="product-img-name">
        <div class="product-img">
          <img :src="'http://81b1-2402-800-6205-3e19-302d-c6f5-cab2-c66f.ngrok.io/apigateway/Products' + product.image" alt="" />
        </div>
        <div class="product-name">
          <p>{{ product.name }}</p>
          <span>Màu: {{product.color}}</span>
          <span> - Kích thước: {{product.size}}</span>
        </div>
      </div>
      <div class="product-price">
        <p>{{ product.price.toLocaleString('it-IT') }}</p>
      </div>
      <div class="product-quantity">
        <p> {{ product.quantity }}</p>
      </div>
      <div class="product-to-money">
        <p>{{ (product.price * product.quantity).toLocaleString('it-IT') }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PaymentCard',
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
  width: 1200px;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-top: 5px;
}
.product-cart {
  display: grid;
  grid-template-columns: 710px 150px 150px 150px;
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
}

.product-img {
  height: 68px;
}

.product-img img {
  width: 68px;
  height: 68px;
}

.product-name {
}

.product-name p,
.product-price p,
.product-to-money p {
  font: 400 15px Roboto;
}

.product-name span {
    font: 400 12px Roboto;
}

.btn-delete {
  width: 44px;
  height: 44px;
}
</style>
