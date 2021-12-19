<template>
  <div class="order-wrapper" v-if="order">
    <div class="order-info">
      <div>
        <span class="order-code">Mã đơn hàng: {{ order.id }} </span>
        <span class="shop-name"> - {{ order.shopName }} </span>
      </div>
      <span class="order-status"> {{ order.state }}</span>
    </div>
    <hr class="hr" />
    <div class="title-head">
      <p class="title-product">Sản phẩm</p>
      <p class="title-price">Đơn giá</p>
      <p class="title-quantity">Số lượng</p>
      <p class="title-to-money">Thành tiền</p>
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
    <div v-show="order.state === 'Chờ xác nhận'" class="cancel-button">
      <v-btn @click="cancelOrder(order.id)" class="btn">
        Hủy đơn
      </v-btn>
    </div>
    <v-dialog v-model="dialog" width="400px">
      <reason-dialog
      @agree-reason-dialog="agreeReasonOrder"
      @cancel-reason-dialog="cancelReasonOrder"
      ></reason-dialog>
    </v-dialog>
  </div>
</template>

<script>
import OrderCard from './OrderCard.vue';
import {mapActions, mapMutations} from 'vuex'
import ReasonDialog from '@/components/ReasonDialog.vue';
export default {
  name: 'Order',
  components: { OrderCard, ReasonDialog,  },
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      products: [],
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      memberCancelOrder: 'ACT_MEMBER_CANCEL_ORDER',
    }),
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    async agreeReasonOrder(reason) {
      if (reason === '') {
        this.setSnackbar({
          type: 'warning',
          text: 'Vui lòng nhập lý do hủy đơn',
          visible: true,
        });
        return;
      }
      let cancelResult = await this.memberCancelOrder({
        orderId: this.orderId,
        calcelReason: reason,
      });
      if (cancelResult) {
        await this.fetchShopOrders('Tất cả');
      }
      this.dialog = false;
    },
    cancelOrder(orderId) {
      this.dialog = true;
      this.orderId = orderId;
    },
    cancelReasonOrder() {
      this.dialog = false;
    },
  },
  created() {
    this.products = this.order.orderDetails.reduce((products, order) => {
      products.push({
        img: order.image,
        name: order.productName,
        quantity: order.quantity,
        price: order.price,
      });
      return products;
    }, []);
  },
};
</script>

<style scoped>
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
  /* text-transform: uppercase; */
}

.order-code {
  color: #616161;
}

.shop-name {
  text-transform: none !important;
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
  grid-template-columns: 750px 110px;
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

.cancel-button {
  justify-content: end;
}
.btn {
  background-color: #fea200 !important;
  color: #ffffff !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  width: 80px !important;
  box-shadow: none !important;
  width: 160px !important;
  height: 40px !important;
}
</style>
