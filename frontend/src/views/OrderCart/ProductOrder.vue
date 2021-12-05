<template>
  <div class="product-cart-wrapper" v-if="product">
    <div class="product-cart">
      <div class="checkbox">
        <input
          type="checkbox"
          v-model="product.selected"
          @click="select"
          :disabled="disable"
        />
      </div>
      <div class="product-img-name">
        <div class="product-img">
          <img :src="'http://localhost:55000/apigateway/Products' + product.image" alt="" />
        </div>
        <div class="product-name">
          <p class="produc-name-detail" :class="{ disable: disable }">
            {{ product.name }}
          </p>
          <span v-if="product.color">Màu: {{product.color}}</span>
          <span v-if="product.size"> - Kích thước: {{product.size}}</span>
          <p class="not-available" v-if="!product.isShopAvailable">
            Shop không còn tồn tại
          </p>
          <p class="not-available" v-if="!product.isRemainInStock">
            Sản phẩm hết hàng
          </p>
          <p class="not-available" v-if="!product.isProductDetailAvailable">
            Phân loại hàng không còn tồn tại
          </p>
        </div>
      </div>
      <div class="product-price" :class="{ disable: disable }">
        <p>{{ product.price.toLocaleString('it-IT') }}</p>
      </div>
      <counter
        :quantity="product.quantity"
        :disable="disable"
        :class="{ disable: disable }"
        @chooseQuantity="chooseQuantity"
      >
      </counter>
      <div class="product-to-money" :class="{ disable: disable }">
        <p>{{ toMoney.toLocaleString('it-IT') }}</p>
      </div>
      <v-btn icon class="btn-delete" @click="deleteCartItem">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue';
import {mapActions} from 'vuex'
export default {
  name: 'ProductOrder',
  components: {
    Counter,
  },
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      disable: null,
      quantity: 1,
      toMoney: 0,
    };
  },
  methods: {
    ...mapActions({
      updateCartQuantity: 'UPDATE_CART_QUANTITY',
      fetchCartItems: 'FETCH_CART_ITEMS',
    }),
    select() {
      this.$emit('selectCheckbox', {
        id: this.product.id,
        selected: !this.product.selected,
      });
    },
    deleteCartItem() {
      this.$emit('deleteCartItem', {id: this.product.id});
    },
    setAvailable() {
      if (
        !this.product.isShopAvailable ||
        !this.product.isProductDetailAvailable ||
        !this.product.isRemainInStock
      ) {
        this.disable = true;
      }
    },
    async chooseQuantity(value) {
      console.log(value);
      let result = await this.updateCartQuantity({cartId: this.product.id, quantity: value});
      if (result) {
        this.fetchCartItems();
        this.toMoney = value * this.product.price;
      } else {
        this.$emit('changeCartQuantity');
      }
    },
  },
  created() {
    this.setAvailable();
    this.toMoney = this.quantity * this.product.price;
    this.quantity = this.product.quantity;
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
  padding: 10px 0;
  margin-top: 5px;
}
.product-cart {
  display: grid;
  grid-template-columns: 50px 550px 150px 150px 150px 150px;
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

.product-name-detail {
  font: 400 15px Roboto;
}

.product-name p,
.product-price p {
  font: 400 15px Roboto;
}

.product-name span {
  font: 400 12px Roboto;
}


.not-available {
  color: red;
  font: 400 12px Roboto !important;
}

.disable {
  color: #d3d2d2;
}

.btn-delete {
  width: 44px;
  height: 44px;
}
</style>
