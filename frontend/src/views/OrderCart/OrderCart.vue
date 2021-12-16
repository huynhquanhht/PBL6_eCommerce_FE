<template>
  <div class="wrapper">
    <div class="order-cart">
      <top-title :title="topTitle"></top-title>
      <div class="title-head" v-if="cartItems.length">
        <input
          class="checkbox"
          type="checkbox"
          v-model="isCheckedAll"
          @click="selectAll()"
        />
        <p class="title-product">Sản phẩm</p>
        <p class="title-price">Đơn giá</p>
        <p class="title-quantity">Số lượng</p>
        <p class="title-to-money">Thành tiền</p>
        <p class="title-operation">Thao tác</p>
      </div>

      <product-order
        v-for="(cartItem, index) in cartItemList"
        :key="index"
        :product="cartItem"
        @selectCheckbox="selectCheckbox"
        @deleteCartItem="deleteCartItem"
        @changeCartQuantity="changeCartQuantity"
      >
      </product-order>
      <div class="total" v-if="cartItems.length">
        <div class="total-value">
          <p class="total-title">Tổng thanh toán:</p>
          <p class="total-price">
            {{ totalPayment.toLocaleString('it-IT') }} đ
          </p>
        </div>
        <v-btn @click="buy">Mua Hàng</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue';
import ProductOrder from './ProductOrder.vue';
import localStorageUtils from '@/utils/utils-local-storage.js'
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'Order',
  components: {
    ProductOrder,
    TopTitle,
  },
  data() {
    return {
      isCheckedAll: false,
      totalPayment: 0,
      cartItemList: [],
      productsPayment: [],
      productsPaymentId: [],
      topTitle: 'Giỏ hàng',
    };
  },
  computed: {
    ...mapGetters({
      cartItems: 'GET_CART_ITEMS',
    }),
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
      setProductsPayment: 'SET_PRODUCTS_PAYMENT'
    }),
    ...mapActions({
      fetchCartQuantity: 'FETCH_CART_QUANTITY',
      fetchCartItems: 'FETCH_CART_ITEMS',
      deleteFetchCartItem: 'DELETE_CART_ITEM',
    }),
    selectAll() {
      this.isCheckedAll = !this.isCheckedAll;
      this.totalPayment = 0;
      this.cartItemList.forEach(item => {
        if (
          item.isShopAvailable ||
          item.isProductDetailAvailable ||
          item.isRemainInStock
        ) {
          if (this.isCheckedAll) {
            item.selected = this.isCheckedAll;
            this.totalPayment += item.price * item.quantity;
          } else {
            item.selected = this.isCheckedAll;
          }
        }
      });
    },
    selectCheckbox(product) {
      if (this.cartItemList.length) {
        let index = this.cartItemList.findIndex(item => item.id == product.id);
        this.cartItemList[index].selected = product.selected;
        if (product.selected) {
          this.totalPayment +=
            this.cartItemList[index].price * this.cartItemList[index].quantity;
        } else {
          this.totalPayment -=
            this.cartItemList[index].price * this.cartItemList[index].quantity;
          this.isCheckedAll = false;
        }
      }
    },
    async deleteCartItem(cartItem) {
      if (cartItem) {
        await this.deleteFetchCartItem(cartItem.id);
        await this.fetchCartItems();
        await this.fetchCartQuantity();
        this.cartItemList = this.filterCartItems(this.cartItems);
      }
    },
    filterCartItems(cartItems) {
      if (cartItems.length) {
        return this.cartItems.reduce((cartItemList, item) => {
          cartItemList.push({
            id: item.id,
            image: item.image,
            name: item.productName,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            size: item.size,
            selected: false,
            isShopAvailable: item.isShopAvailable,
            isProductDetailAvailable: item.isProductDetailAvailable,
            isRemainInStock: item.isRemainInStock,
          });
          return cartItemList;
        }, []);
      }
      return [];
    },
    async changeCartQuantity() {
      await this.fetchCartItems();
    },
    buy() {
      this.cartItemList.forEach(item => {
        if (item.selected) {
          this.productsPayment.push(item);
          this.productsPaymentId.push(item.id);
        }
      });
      if (!this.productsPayment.length) {
       this.setSnackbar({
          type: 'warning',
          text: 'Vui lòng chọn sản phẩm để mua',
          visible: true,
        });
      } else {
        localStorageUtils.setProductsPayment(JSON.stringify(this.productsPaymentId));
        this.setProductsPayment(this.productsPayment);
        this.$router.push('/payment');
      }
    },
  },
  watch: {
    cartItems() {
      this.cartItemList = this.filterCartItems(this.cartItems);
    },
  },
  beforeMount() {
    this.fetchCartItems();
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.order-cart {
  width: 1200px;
}
.title-head {
  display: grid;
  grid-template-columns: 50px 550px 150px 150px 150px 150px;
  height: 40px;
  background-color: #ffffff;
  margin-top: 10px;
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
</style>
