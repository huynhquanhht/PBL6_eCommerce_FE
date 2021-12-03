<template>
  <div class="product-info-wrapper">
    <div class="product-name-block">
      <p class="product-name">
        {{productInfo.name}}
      </p>
    </div>
    <div class="product-price-block">
      <p class="product-price">{{productInfo.price}} đ</p>
    </div>
    <div class="color-block" v-if="productInfo.colors.length">
      <div class="color-title">
        <p>Màu</p>
      </div>
      <div class="color-buttons">
        <button
          v-for="(color, index) in productInfo.colors"
          :key="index"
          :class="{'active-color': productInfo.colors[index].active}"
          @click="chooseColor(index)"
        >
          {{ color.name }}
        </button>
      </div>
    </div>
    <div class="size-block" v-if="productInfo.sizes.length">
      <div class="size-title">
        <p>Kích thước</p>
      </div>
      <div class="size-buttons">
        <button
          v-for="(size, index) in productInfo.sizes"
          :key="index"
          :class="{'active-color': productInfo.sizes[index].active}"
          @click="chooseSize(index)"
        >
          {{ size.name }}
        </button>
      </div>
    </div>
    <div class="quantity-block">
      <p>Số lượng</p>
      <counter @chooseQuantity="chooseQuantity"></counter>
    </div>
   
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue';
export default {
  name: 'ProductInfo',
  components: {
    Counter,
  },
  props: {
    productInfo: { type: Object},
  },
  data() {
    return {
      colorIndex: null,
      sizeIndex: null,
      quantityResult: 1,
      activeColors: null,
      choosedColor: '',
      choosedSize: '',
    };
  },
  methods: {
    chooseColor(colorIndex) {
      this.productInfo.colors.forEach(item => {item.active = false});
      this.productInfo.colors[colorIndex].active = true;
      this.colorIndex = colorIndex;
      this.choosedColor = this.productInfo.colors[colorIndex].name;
      this.$emit('chooseOptions', {
        color: this.choosedColor,
        size: this.choosedSize,
        quantity: this.quantityResult
      })
    },
    chooseSize(sizeIndex) {
      this.productInfo.sizes.forEach(item => {item.active = false});
      this.productInfo.sizes[sizeIndex].active = true;
      this.sizeIndex = sizeIndex;
      this.choosedSize = this.productInfo.sizes[sizeIndex].name;
      this.$emit('chooseOptions', {
        color: this.choosedColor,
        size: this.choosedSize,
        quantity: this.quantityResult
      })
    },
    chooseQuantity(result) {
      this.quantityResult = result;
      this.$emit('chooseOptions', {
        color: this.choosedColor,
        size: this.choosedSize,
        quantity: this.quantityResult
      })
    },
  },
  created() {
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
}

.product-name-block {
  margin-bottom: 16px;
}
.product-name {
  font: 300 20px Roboto;
  text-align: justify;
  color: #616161;
}
.product-price-block {
  background-color: #f5f5f5;
  height: 50px;
  padding: 10px;
  margin-bottom: 16px;
}
.product-price {
  font: 400 20px Roboto;
  line-height: 30px;
  color: #fea200;
}

.color-block {
  margin-bottom: 16px;
}

.size-block {
  margin-bottom: 16px;
}

.quantity-block {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.color-title,
.size-title,
.quantity-block {
  font: 500 16px Roboto;
  color: #616161;
  margin-bottom: 4px;
}

.color-title p,
.size-title p,
.quantity-block p {
  font: 500 14px Roboto;
  color: #616161;
}

.color-buttons,
.size-buttons {
  display: flex;
  column-gap: 10px;
}

.color-buttons button,
.size-buttons button {
  padding: 3px 10px 3px 10px;
  min-width: 60px;
  min-height: 35px;
  background-color: #ffffff;
  color: #616161;
  font: 400 15px Roboto;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}

.color-buttons button:hover,
.size-buttons button:hover {
  background-color: #fcf6f6;
  color: #fea200;
  border: 1px solid #fea200;
}

.color-buttons button:focus .color-buttons button:focus {
  background-color: #fcf6f6;
  color: #fea200;
  border: 1px solid #fea200;
}

.active-color {
  background-color: #fcf6f6 !important;
  color: #fea200 !important;
  border: 1px solid #fea200 !important;
}
</style>
