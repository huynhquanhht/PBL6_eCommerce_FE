<template>
  <div class="order-wrapper">
    <div class="order-info">
      <span class="order-code">Đơn hàng: 2013</span>
      <span class="order-status">Chờ xác nhận</span>
    </div>
    <hr class="hr" />
    <div class="title-head">
      <p class="title-product">Sản phẩm</p>
      <p class="title-price">Đơn giá</p>
      <p class="title-quantity">Số lượng</p>
      <p class="title-to-money">Thành tiền</p>
      <p class="title-to-money">Thao tác</p>
    </div>

    <order-card
      v-for="(product, index) in products"
      :key="index"
      :product="product"
    ></order-card>
    <div class="value-total">
      <hr class="hr" />
      <div class="product-total">
        <span>Tổng tiền hàng: </span>
        <span>259.000 đ</span>
      </div>
      <div class="ship-fee">
        <span>Phí vận chuyển: </span>
        <span>10.000 đ</span>
      </div>
      <div class="total-payment">
        <span>Tổng thanh toán: </span>
        <span> 309000 đ</span>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCard from './OrderCard.vue';
export default {
  components: { OrderCard },
  name: 'Order',
  data() {
    return {
      products: [
        {
          img: 'SP1/1.jpg',
          name: 'Siêu phẩm áo khoác nam lông cừu',
          quantity: 2,
          price: 259000,
        },
        {
          img: 'SP1/1.jpg',
          name: 'Siêu phẩm áo khoác nam lông cừu',
          quantity: 2,
          price: 259000,
        },
        {
          img: 'SP1/1.jpg',
          name: 'Siêu phẩm áo khoác nam lông cừu',
          quantity: 2,
          price: 259000,
        },
      ],
    };
  },
};
</script>

<style>
.v-application p {
  margin-bottom: 0px;
}
.order-wrapper {
  background-color: #ffffff;
  margin-top: 5px;
  padding: 0px 20px;
}

.title {
  height: 36px !important;
  padding-top: 4px;
}

.title-head {
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 450px 140px 140px 140px;
  height: 20px;
  background-color: #ffffff;
  margin-top: 5px;
  align-items: center;
  justify-items: center;
}

.title-product,
.title-price,
.title-quantity,
.title-to-money,
.title-operation {
  font: 600 16px Roboto;
  color: #616161;
  align-self: center;
}

.order-info {
  padding: 12px 20px 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info span {
  line-height: 10px;
  font: 500 16px Roboto;
  text-transform: uppercase;
}

.order-code {
  color: #616161;
}

.order-status {
  color: #fea200;
  font: 400 14px Roboto;
}

.hr {
  margin-bottom: 5px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}

.value-total {
  padding: 10px 0px;
  background-color: #ffffff;
  margin-top: 5px;
}

.payment-method {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.payment-method span,
.product-total span,
.ship-fee span,
.total-payment span,
.order span {
  font: 400 15px Roboto;
  color: #000000;
}

.product-total,
.ship-fee,
.total-payment {
  display: grid;
  grid-template-columns: 780px 80px;
  column-gap: 30px;
  margin-top: 10px;
}

.product-total span:first-child,
.ship-fee span:first-child,
.total-payment span:first-child {
  justify-self: end;
}

.product-total span:last-child,
.ship-fee span:last-child,
.total-payment span:last-child {
  justify-self: end;
}

.total-payment span:last-child {
  font: 500 16px Roboto;
  color: #fea200;
}

.total-payment {
  margin-bottom: 10px;
}
</style>
