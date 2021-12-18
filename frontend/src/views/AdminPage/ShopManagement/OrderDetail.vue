<template>
  <div class="wrapper">
    <div class="payment">
      <top-title :title="topTitle + ' ' + this.id"></top-title>
      <div class="address">
        <div class="address-title-block">
          <div class="address-title">
            <v-icon>mdi-map-marker</v-icon>
            <span>Địa chỉ nhận hàng</span>
          </div>
        </div>
        <div class="address-info">
          <div class="address-fullname">
            <span>Họ tên: </span>
            <span> {{ this.shipName }}</span>
          </div>
          <div class="address-phone">
            <span>Số điện thoại: </span>
            <span> {{this.shipPhone}}</span>
          </div>
          <div class="address-home">
            <span>Địa chỉ: </span>
            <span> {{this.shipAddress}}</span>
          </div>
        </div>
      </div>
      <div class="product-table">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Thành tiền</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in orderDetails" :key="product.orderId">  
            <td class="product-name-img">
              <img
                :src="
                  'http://9c58-2402-800-6205-3e19-302d-c6f5-cab2-c66f.ngrok.io/apigateway/Products' + product.image"
                alt=""
                width="40px"
                height="40px"
              />
              <span>{{ product.productName }} 
              --Màu: {{ product.color}}
              --kích thước: {{ product.size}}</span>
            </td>
            <td>{{ product.price }}</td>
            <td>{{product.quantity}}</td>
            <td>{{product.price * product.quantity}}</td>
          </tr>
        </tbody>
      </table>
    </div>
      <div class="value-total">
        <div class="payment-method">
          <span> Phương thức thanh toán </span>
          <span> Thanh toán khi nhận hàng</span>
        </div>
        <hr class="hr" />
        <!-- <div class="product-total">
          <span>Tổng tiền hàng: </span>
          <span> {{ this.totalPrice }} đ</span>
        </div>
        <div class="ship-fee">
          <span>Phí vận chuyển: </span>
          <span>10.000 đ</span>
        </div> -->
        <div class="total-payment">
          <span>Tổng thanh toán: </span>
          <span> {{this.totalPrice}} đ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle';
//import localStorageUtils from '@/utils/utils-local-storage.js';

export default {
  name: 'OrderDetails',
  components: { 
      //PaymentCard, 
      TopTitle, 
      //AddressForm 
  },
  props: { 
    eachOrder: { 
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      topTitle: 'Mã hóa đơn',
      id: 0,
      shipName: '',
      shipAddress: '',
      shipPhone: '',
      totalPrice: 0,
      orderDetails: [],
      orderIndex: 0,
    };
  },
  watch: {
    eachOrder() {
      console.log(this.eachOrder.orderDetails);
      if(this.eachOrder != null) { 
        this.id = this.eachOrder.id;
        this.shipName = this.eachOrder.shipName;
        this.shipPhone = this.eachOrder.shipPhone;
        this.shipAddress = this.eachOrder.shipAddress;
        this.totalPrice = this.eachOrder.totalPrice;
        this.orderDetails = this.eachOrder.orderDetails;
      }
    },
  },
  async created() {
    console.log(this.eachOrder);
    console.log(this.eachOrder.orderDetails);
     if(this.eachOrder != null) {
        this.id = this.eachOrder.id;
        this.shipName = this.eachOrder.shipName;
        this.shipPhone = this.eachOrder.shipPhone;
        this.shipAddress = this.eachOrder.shipAddress;
        this.totalPrice = this.eachOrder.totalPrice;
        this.orderDetails = this.eachOrder.orderDetails;
    }
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
  grid-template-columns: 1050px 80px;
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

.styled-table {
  border-collapse: collapse;
  margin: 5px 0px;
  font: 400 15px Roboto;
  width: 100%;
}

.styled-table thead tr {
  background-color: #ffffff;
  color: #616161;
  text-align: left;
  border-bottom: 1px solid #616161;
}

.styled-table th {
  padding: 12px 15px;
}

.styled-table td {
  padding: 3px 15px;
}
.product-name-img {
  display: flex;
  align-items: center;
  gap: 10px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #616161; 
  font: 400 15px Roboto;
  background-color: #ffffff;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #ffffff;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #ffffff;
}

</style>
