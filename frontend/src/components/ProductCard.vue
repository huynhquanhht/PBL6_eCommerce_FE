<template>
  <div class="product-card-block" @click="selectProduct()">
    <div class="product-card">
      <div class="product-image">
        <img :src="imgUrl" alt=""  />
      </div>
      <div class="product-name">
        <p>
          {{ productName }}
        </p>
      </div>
      <div class="product-info">
        <p class="product-price">{{ productPrice.toLocaleString('it-IT') }} đ</p>
        <div class="product-view">
          <i class="fas fa-eye"></i>
          <span> {{ productViews }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    imgUrl: {
      type: String
    },
    productId: {
      type: Number
    },
    productName: {
      type: String
    },
    productPrice: {
      type: Number
    },
    productViews: {
      type: Number
    }
  },
  methods: {
    selectProduct() {
      this.$router.push(`/product/${this.productId}`);
    }
  }
};
</script>

<style scoped>
.product-card-block {
  height: 270px;
  width: 190px;
  background-color: #ffffff;
  padding: 10px 10px 0px 10px;
  cursor: pointer;
}

.product-card-block:hover {
  transform: translateY(-5px);
  transition: linear .5s;
}

.product-image {
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #616161;
}

.product-image img{
  max-width: 170px;
  max-height: 170px;
}

.product-name {
  height: 36px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.product-name p {
  font: 400 14px Roboto;
  color: #616161;
  line-height: 18px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.product-info {
  display: flex;
  justify-content: space-between;
  height: 12px;
}

.product-price {
  font: 500 14px Roboto;
  color: #fea200;
}

.product-view {
  display: flex;
  column-gap: 2px;
}

.product-view i {
  color: #616161;
  font-size: 13px;
}

.product-view span {
  font: 400 11px Roboto;
  color: #616161;
}
</style>
