<template>
  <div class="wrapper" v-if="productDetail">
    <div class="product">
      <div class="product-info">
        <div class="left-content">
          <gallery-slider
            :imgUrls="imagePaths"
            v-if="imagePaths"
          ></gallery-slider>
        </div>
        <div class="right-content">
          <product-info
            :productInfo="productInfo"
            v-if="productInfo"
            @chooseOptions="chooseOptions"
          ></product-info>
          <div class="buy-buttons">
            <v-btn class="btn add-cart" @click="addCart">
              <v-icon left>fa-cart-plus</v-icon>
              Thêm Vào Giỏ Hàng</v-btn
            >
            <v-btn class="btn buy-now" @click="buyNow">Mua Ngay</v-btn>
          </div>
        </div>
      </div>
    </div>
    <shop-description
      class="shop-description"
      :colors="colors"
      :sizes="sizes"
      :shopDetail="shopDetail"
    ></shop-description>
    <product-description
      :productDescription="productDescription"
    ></product-description>
  </div>
</template>

<script>
import ShopDescription from './ShopDescription.vue';
import GallerySlider from './GallerySlider.vue';
import ProductInfo from './ProductInfo.vue';
import ProductDescription from './ProductDescription.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  components: {
    GallerySlider,
    ShopDescription,
    ProductInfo,
    ProductDescription,
  },
  props: {
    id: { type: Number },
  },
  data() {
    return {
      choosedColor: '',
      choosedSize: '',
      choosedQuantity: 1,
      productDescription: null,
      shopDetail: null,
      colors: [],
      sizes: [],
      imagePaths: null,
      productInfo: null,
    };
  },
  computed: {
    ...mapGetters({
      productDetail: 'GET_PRODUCT_DETAIL',
      isAddSuccess: 'GET_ADD_RESULT',
    }),
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      fetchCartQuantity: 'FETCH_CART_QUANTITY',
      fetchProductDetail: 'FETCH_PRODUCT_DETAIL',
      addCartItem: 'ADD_CART_ITEM',
    }),
    filterColors(details) {
      return details.reduce((colors, detail) => {
        if (
          detail.color &&
          !colors.some((color) => color.name === detail.color)
        ) {
          colors.push({ name: detail.color, active: false });
        }
        return colors;
      }, []);
    },

    filterSizes(details) {
      return details.reduce((sizes, item) => {
        if (item.size && !sizes.some((size) => size.name === item.size)) {
          sizes.push({ name: item.size, active: false });
        }
        return sizes;
      }, []);
    },

    filterImagePath(images) {
      return images.reduce((imagePaths, item) => {
        if (item.isDefault && item.colorName !== null) {
          return imagePaths;
        }
        if (item.imagePath) {
          imagePaths.push(item.imagePath);
        }
        return imagePaths;
      }, []);
    },

    filterProductInfo(detail, colors, sizes) {
      if (detail) {
        return {
          name: detail.resultObj.name,
          price: detail.resultObj.price.toLocaleString('it-IT'),
          colors,
          sizes,
        };
      }
    },
    filterShopInfo(detail) {
      if (detail) {
        return {
          name: detail.resultObj.shopName,
          description: detail.resultObj.shopDescription,
        };
      }
    },
    chooseOptions(payload) {
      this.choosedColor = payload.color;
      this.choosedSize = payload.size;
      this.choosedQuantity = payload.quantity;
    },
    checkBuy() {
      if (this.colors.length && this.choosedColor === '') {
        this.setSnackbar({
          type: 'info',
          text: 'Vui lòng chọn màu trước khi đặt sản phẩm',
          visible: true,
        });
        return false;
      }
      if (this.sizes.length && this.choosedSize === '') {
        this.setSnackbar({
          type: 'info',
          text: 'Vui lòng chọn kích thước trước khi đặt sản phẩm',
          visible: true,
        });
        return false;
      }
      return true;
    },
    async addCart() {
      if (!this.checkBuy()) {
        return;
      }
      if (this.sizes.length) {
        let detailItem = this.productDetail.resultObj.details.find(
          (item) =>
            this.choosedColor === item.color && this.choosedSize === item.size
        );
        if (!detailItem) {
          this.setSnackbar({
            type: 'info',
            text: 'Sản phẩm này đã hết hàng',
            visible: true,
          });
          return;
        }
        let product = {
          productDetail_Id: detailItem.id,
          quantity: this.choosedQuantity,
        };
        await this.addCartItem(product);
        await this.fetchCartQuantity();
      } else {
        let index = this.productDetail.resultObj.details.filter(
          (item) => this.choosedColor === item.color
        );
        let product = {
          productDetail_Id: this.productDetail.resultObj.details[index].id,
          quantity: this.choosedQuantity,
        };
        await this.addCartItem(product);
        await this.fetchCartQuantity();
      }
    },
    async buyNow() {
      if (!this.checkBuy()) {
        return;
      }
      if (this.sizes.length) {
        let detailItem = this.productDetail.resultObj.details.find(
          (item) =>
            this.choosedColor === item.color && this.choosedSize === item.size
        );
        let product = {
          productDetail_Id: detailItem.id,
          quantity: this.choosedQuantity,
        };
        await this.addCartItem(product);
        if (this.isAddSuccess) {
          await this.fetchCartQuantity();
          this.$router.push('/cart');
        }
      } else {
        let index = this.productDetail.resultObj.details.filter(
          (item) => this.choosedColor === item.color
        );
        let product = {
          productDetail_Id: this.productDetail.resultObj.details[index].id,
          quantity: this.choosedQuantity,
        };
        await this.addCartItem(product);
        if (this.isAddSuccess) {
          await this.fetchCartQuantity();
          this.$router.push('/cart');
        }
      }
    },
  },
  async created() {
    await this.fetchProductDetail({ id: this.id });
    this.colors = this.filterColors(this.productDetail.resultObj.details);
    this.sizes = this.filterSizes(this.productDetail.resultObj.details);
    this.imagePaths = this.filterImagePath(this.productDetail.resultObj.images);
    this.productInfo = this.filterProductInfo(
      this.productDetail,
      this.colors,
      this.sizes
    );
    this.productDescription = this.productDetail.resultObj.description;
    this.shopDetail = this.filterShopInfo(this.productDetail);
    document.title = this.productInfo.name;
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px !important;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-breadcrumbs {
  padding: 0px !important;
  margin-top: 16px;
  color: #616161 !important;
}

.product-info {
  width: 1200px;
  display: flex;
  column-gap: 30px;
  background-color: #ffffff;
  padding: 20px;
  margin-top: 16px;
}

.right-content {
  align-self: flex-start;
  width: 940px;
}

.shop-description {
  width: 1200px;
}

.buy-buttons {
  margin-top: 32px;
}
.btn {
  border-radius: 4px !important;
  letter-spacing: 0;
  height: 44px !important;
  text-transform: none;
  box-shadow: none;
}

.add-cart {
  background-color: #f9f0e0 !important;
  color: #fea200 !important;
  font: 400 14px Roboto !important;
  margin-right: 8px;
  border: 1px solid #fea200 !important;
}

.buy-now {
  background-color: #fea200 !important;
  color: #ffffff !important;
}
</style>
