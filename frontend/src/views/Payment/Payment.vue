<template>
  <div class="wrapper">
    <div class="payment">
      <top-title :title="topTitle"></top-title>
      <div class="address">
        <div class="address-title-block">
          <div class="address-title">
            <v-icon>mdi-map-marker</v-icon>
            <span>Địa chỉ nhận hàng</span>
          </div>
          <span class="change-title" @click="changeAddress">Thay đổi</span>
        </div>
        <div class="address-info" v-show="!addressFormStatus">
          <div class="address-fullname">
            <span>Họ tên: </span>
            <span> {{ addressInfo.fullname }}</span>
          </div>
          <div class="address-phone">
            <span>Số điện thoại: </span>
            <span> {{ addressInfo.phone }}</span>
          </div>
          <div class="address-home">
            <span>Địa chỉ: </span>
            <span> {{ addressInfo.address }}</span>
          </div>
        </div>
        <address-form
          :addressInfo="addressInfo"
          v-show="addressFormStatus"
          v-if="userInfo"
          @processAddressForm="processAddressForm"
        ></address-form>
      </div>
      <div class="title-head">
        <p class="title-product">Sản phẩm</p>
        <p class="title-price">Đơn giá</p>
        <p class="title-quantity">Số lượng</p>
        <p class="title-to-money">Thành tiền</p>
      </div>
      <payment-card
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      ></payment-card>
      <div class="value-total">
        <div class="payment-method">
          <span> Phương thức thanh toán </span>
          <span> Thanh toán khi nhận hàng</span>
        </div>
        <hr class="hr" />
        <div class="product-total">
          <span>Tổng tiền hàng: </span>
          <span> {{ totalMoney.toLocaleString('it-IT') }} đ</span>
        </div>
        <div class="ship-fee">
          <span>Phí vận chuyển: </span>
          <span>10.000 đ</span>
        </div>
        <div class="total-payment">
          <span>Tổng thanh toán: </span>
          <span> {{ (totalMoney + 10000).toLocaleString('it-IT') }} đ</span>
        </div>
        <hr class="hr" />
        <div class="order">
          <span
            >Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo
            <a>Điều khoản Versace</a>
          </span>
          <v-btn @click="order">Đặt hàng</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle';
import PaymentCard from './PaymentCard.vue';
import AddressForm from './AddressForm.vue';
import localStorageUtils from '@/utils/utils-local-storage.js';
import { mapState, mapGetters, mapActions } from 'vuex';
import router from '@/router';
export default {
  name: 'Payment',
  components: { PaymentCard, TopTitle, AddressForm },
  data() {
    return {
      addressFormStatus: false,
      addressInfo: {
        fullname: '',
        phone: '',
        address: '',
      },
      products: [],
      totalMoney: 0,
      totalPayment: 0,
      topTitle: 'Thanh toán',
    };
  },
  computed: {
    ...mapState({
      productsPayment: (state) => state.productsPayment,
    }),
    ...mapGetters({
      productsPayment: 'GET_PRODUCTS_PAYMENT',
      userInfo: 'GET_USER_INFO',
    }),
  },
  methods: {
    ...mapActions({
      fetchUserInfo: 'FETCH_USER_INFO',
      orderCart: 'ORDER_CART',
      fetchCartQuantity: 'FETCH_CART_QUANTITY',
    }),
    changeAddress() {
      this.addressFormStatus = true;
    },
    processAddressForm(addressInfo) {
      if (addressInfo) {
        this.addressInfo = addressInfo;
        this.addressFormStatus = false;
      }
      this.addressFormStatus = false;
    },
    filterProductsPayment(productsPayment) {
      if (productsPayment.length) {
        return productsPayment.reduce((cartItemList, item) => {
          cartItemList.push({
            id: item.id,
            image: item.image,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            size: item.size,
          });
          return cartItemList;
        }, []);
      }
      return [];
    },
    async order() {
      let productsPaymentId = JSON.parse(
        localStorageUtils.getProductsPayment()
      );
      let order = {
        cartIds: productsPaymentId,
        shipName: this.addressInfo.fullname,
        shipAddress: this.addressInfo.address,
        shipPhone: this.addressInfo.phone,
      };
      let result = await this.orderCart(order);
      if (result) {
        await this.fetchCartQuantity();
        router.push('/member-info/purchase-order');
      }
    },
  },
  watch: {
    userInfo() {
      if (this.userInfo) {
        this.addressInfo.fullname = this.userInfo.fullname;
        this.addressInfo.phone = this.userInfo.phoneNumber;
        this.addressInfo.address = this.userInfo.address;
      }
    },
  },
  async created() {
    await this.fetchUserInfo();
    this.products = this.filterProductsPayment(this.productsPayment);
    this.totalMoney = this.products.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
}
.wrapper {
  display: flex;
  justify-content: center;
}
.order-cart {
  width: 1200px;
}

.address {
  padding: 10px 20px;
  background-color: #ffffff;
  margin-top: 5px;
}
.address-title-block {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.address-title {
  display: flex;
  align-items: flex-end;
}

.change-title {
  font: 400 15px Roboto;
  line-height: 16px;
  color: rgb(28, 128, 243);
}

.change-title:hover {
  text-decoration: underline;
  cursor: pointer;
}

.address-title .v-icon {
  color: #fea200;
}

.address-title span {
  font: 400 15px Roboto;
  color: #fea200;
  line-height: 16px;
}

.address-info {
  margin-top: 5px;
  margin-left: 24px;
}
.address-info span {
  font: 400 15px Roboto;
}
.title-head {
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 710px 150px 150px 150px;
  height: 40px;
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
}

.checkbox {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.total {
  display: grid;
  grid-template-columns: 1030px 150px;
  column-gap: 20px;
  background-color: #ffffff;
  padding: 10px 0;
  margin-top: 10px;
}

.total .v-btn {
  width: 120px;
  height: 40px;
  width: 108px;
  letter-spacing: 0;
  text-transform: none;
  font: 500 15px Roboto;
  background-color: #fea200 !important;
  color: #ffffff;
  box-shadow: none;
}
.total-value {
  display: flex;
  column-gap: 10px;
  align-items: center;
  justify-self: end;
}
.total-title {
  font: 500 16px Roboto;
  color: #616161;
}
.total-price {
  font: 500 18px Roboto;
  color: #fea200;
}

.value-total {
  padding: 10px 20px;
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
  grid-template-columns: 1020px 110px;
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

.order {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
.order a:hover {
  text-decoration: underline;
}

.order .v-btn {
  box-shadow: none;
  background-color: #fea200 !important;
  color: #ffffff !important;
  width: 100px !important;
  height: 40px !important;
  border-radius: 4px !important;
  text-transform: none;
  font: 400 15px Roboto;
  letter-spacing: 0;
}

.hr {
  width: 100%;
  height: 1px;
  background-color: #616161;
}
</style>
