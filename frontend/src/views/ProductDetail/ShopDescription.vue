<template>
  <div class="shop-description-wrapper" v-if="shopDetail">
    <div class="shop-info">
      <div class="shop-identity">
        <img src="@/assets/images/avatar-shop.jpg" alt="" class="shop-avatar" />
        <div class="shop-name">
          <p>{{ shopDetail.name }}</p>
          <v-btn>Xem shop</v-btn>
        </div>
      </div>
      <hr class="hr" />
      <div class="shop-description">
        <p class="title-head">Mô tả shop</p>
        <p class="shop-detail">{{ shopDetail.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopDescription',
  props: {
    shopDetail: { type: Object },
  },
  data() {
    return {};
  },
  methods: {
    filterColors(images) {
      return images.reduce((colors, image) => {
        if (image.colorName) {
          colors.push(image.colorName);
        }
        return colors;
      }, []);
    },

    filterSize(details) {
      return details.reduce((sizes, item) => {
        if (item.size && !sizes.includes(item.size)) {
          sizes.push(item.size);
        }
        return sizes;
      }, []);
    },

    filterImagePath(images) {
      return images.reduce((imagePaths, image) => {
        if (image.imagePath) {
          imagePaths.push(image.imagePath);
        }
        return imagePaths;
      }, []);
    },
  },
  created() {},
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
}
.shop-description-wrapper {
  width: 1200px;
  background-color: #ffffff;
  margin-top: 10px;
  padding: 16px 20px;
}
.shop-info {
  display: flex;
  column-gap: 20px;
}
.shop-identity {
  display: flex;
  column-gap: 10px;
}
.shop-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: solid 2px #fea200;
}
.shop-name {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.shop-name p {
  color: #616161;
  font: 400 14px Roboto;
  margin-bottom: 4px;
}

.shop-name .v-btn {
  box-shadow: none;
  background-color: #fea200 !important;
  border-radius: 4px !important;
  letter-spacing: 0;
  text-transform: none;
  color: #ffffff;
  height: 32px !important;
  width: 84px !important;
  font: 400 14px Roboto;
}

.hr {
  height: 56px;
  width: 1px;
  background-color: #616161;
}

.title-head {
  font: 500 16px Roboto;
  color: #616161;
}
.shop-description .shop-detail {
  font: 300 15px Roboto;
  text-align: justify;
  margin-top: 4px;
  line-height: 18px;
}
</style>
