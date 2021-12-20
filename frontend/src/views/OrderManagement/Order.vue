<template>
  <div class="order-wrapper" v-if="product">
    <div class="order-info-basic">
      <div class="order-info">
        <div>
          <span class="order-code">Mã đơn hàng: {{ order.id }} </span>
        </div>
        <span class="order-status">Trạng thái: {{ order.state }}</span>
      </div>
      <div class="address-info">
        <p>Thông tin địa chỉ giao hàng</p>
        <div class="address-fullname">
          <span>Họ tên: </span>
          <span> {{ order.shipName }}</span>
        </div>
        <div class="address-phone">
          <span>Số điện thoại: </span>
          <span> {{ order.shipPhone }}</span>
        </div>
        <div class="address-home">
          <span>Địa chỉ: </span>
          <span> {{ order.shipAddress }}</span>
        </div>
      </div>

    </div>
          <div class="product-order">
        <p>Danh sách sản phẩm đã đặt</p>
      </div>
    <hr class="hr" />
    <div class="title-head">
      <p class="title-product">Sản phẩm</p>
      <p class="title-price">Đơn giá</p>
      <p class="title-quantity">Số lượng</p>
      <p class="title-to-money">Thành tiền</p>
    </div>

    <order-card :product="product"></order-card>
    <div class="value-total">
      <hr class="hr" />
      <div class="product-total">
        <span>Tổng tiền hàng: </span>
        <span> {{ order.totalPrice.toLocaleString('it-IT') }} đ</span>
      </div>
      <div class="ship-fee">
        <span>Phí vận chuyển: </span>
        <span>10.000 đ</span>
      </div>
      <div class="total-payment">
        <span>Tổng thanh toán: </span>
        <span> {{ (order.totalPrice + 10000).toLocaleString('it-IT') }} đ</span>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCard from './OrderCard.vue';
export default {
  name: 'Order',
  components: { OrderCard },
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      product: null,
    };
  },
  watch: {
    order() {
      this.product = {
        img: this.order.orderDetails[0].image,
        name: this.order.orderDetails[0].productName,
        quantity: this.order.orderDetails[0].quantity,
        price: this.order.orderDetails[0].price,
      };
    },
  },
  created() {},
};
</script>

<style>
.v-application p {
  margin-bottom: 0px;
}
.order-wrapper {
  background-color: #ffffff;
  margin-top: 5px;
}

.title {
  height: 36px !important;
  padding-top: 4px;
}

.title-head {
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 600px 140px 140px 140px;
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
  padding: 0px 20px 0px 0px;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
}

.order-info span {
  line-height: 10px;
  font: 500 16px Roboto;
  /* text-transform: uppercase; */
}

.order-code {
  color: #616161;
}

.shop-name {
  text-transform: none !important;
  color: #616161;
    font: 500 15px Roboto !important;
}

.order-status {
  color: #616161;
  font: 400 16px Roboto !important;
}

.address-info {
  margin-top: 5px;
  margin-bottom: 5px;
}

.address-info > p {
  font: 500 16px Roboto;
  color: #616161;
}
.address-info span {
  font: 400 16px Roboto;
  color: #616161;
  line-height: 24px;
}

.product-order {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
}

.product-order p {
  text-transform: uppercase;
  font: 600 17px Roboto;
  color: #616161;
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
  grid-template-columns: 860px 110px;
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
