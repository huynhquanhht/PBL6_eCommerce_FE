<template>
  <div class="gallery-wrapper">
    <div class="main-image">
      <img
        :src=" myBaseUrl + 'apigateway/Products' + activePic"
        alt=""
      />
    </div>
    <div class="slide-wrapper">
      <div
        class="arrow arrow-left"
        @click="scrollLeft"
        v-if="imgUrls.length > 4"
      >
        <v-icon>fa-chevron-left</v-icon>
      </div>
      <div class="slider-img-block">
        <div
          class="slider-img"
          v-for="(imgUrl, index) in imgUrls"
          :key="index"
          :class="{ active: index == indexOfActive ? true : false }"
        >
          <img
            class="thumbnail"
            :src=" myBaseUrl + 'apigateway/Products' + imgUrl"
            @mouseover="changeActivePic(index)"
          />
        </div>
      </div>
      <div
        class="arrow arrow-right"
        @click="scrollRight"
        v-if="imgUrls.length > 4"
      >
        <v-icon>fa-chevron-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GallerySlider',
  props: {
    imgUrls: {
      type: Array,
    },
  },
  data() {
    return {
      indexOfActive: null,
      activePic: null,
      myBaseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  methods: {
    scrollLeft() {
      let content = document.querySelector('.slider-img-block');
      content.scrollLeft -= 60;
    },
    scrollRight() {
      let content = document.querySelector('.slider-img-block');
      content.scrollLeft += 60;
    },
    changeActivePic(index) {
      this.activePic = this.imgUrls[index];
      this.indexOfActive = index;
    },
  },
  created() {
    this.changeActivePic(0);
  },
};
</script>

<style scoped>
.main-image img {
  width: 450px;
  height: 450px;
}

.slide-wrapper {
  width: 450px;
  display: flex;
  min-height: 100px;
  align-items: center;
  position: relative;
}

.slider-img-block {
  width: 450px;
  height: 88px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  column-gap: 10px;
  position: relative;
}

.slider-img {
  padding: 0px;
  height: 84px;
  border: 2px solid #ffffff;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
}

.active {
  border: 2px solid #fea200;
}

.slider-img img {
  width: 80px;
  height: 80px;
}

.slider-img-block::-webkit-scrollbar {
  display: none;
}

.arrow {
  height: 80px;
  width: 24px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  opacity: 0.6;
}

.arrow:hover {
  background-color: #1b1b1b;
  cursor: pointer;
}

.arrow-left {
  position: absolute;
  z-index: 1;
  left: 0;
}

.arrow-right {
  position: absolute;
  z-index: 2;
  right: 0;
}

.arrow .v-icon {
  width: 10px;
  height: 10px;
  font-weight: 200 !important;
  color: #ffffff;
  font-size: 14px !important;
}
</style>
