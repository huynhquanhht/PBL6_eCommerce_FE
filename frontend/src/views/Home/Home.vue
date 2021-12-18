<template>
  <v-app>
    <div v-if="allProducts">
      <banner class="banner-block"></banner>
      <Services class="services-block"></Services>
      <top-title :title="titles[0]" class="top-title"></top-title>
      <product-card-list :productList="allProducts"></product-card-list>
      <div class="view-more-block">
        <v-btn class="view-more">Xem thêm</v-btn>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-center align-center"
      style="width: 100wm; height: 70vh"
    >
      <v-progress-circular
        :size="40"
        color="#fea200"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
import Services from '@/views/Home/Services.vue';
import Banner from './Banner.vue';
import TopTitle from '@/components/TopTitle.vue';
import ProductCardList from '@/components/ProductCardList.vue';
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Home',
    components: {
    Services,
    Banner,
    TopTitle,
    ProductCardList,
  },
  data() {
    return {
      titles: ['Gợi ý hôm nay']
    };
  },
  methods: {
    ...mapActions({
      getAllProducts: 'ACT_GET_ALL_PRODUCTS',
    })
  },
  computed: {
    ...mapGetters({
      allProducts: 'GET_ALL_PRODUCTS'
    })
  },
  async created() {
    await setTimeout( async () => {
          await this.getAllProducts({ pageIndex: 1, pageSize: 24 });
    }, 3000);
  },
};
</script>

<style scoped>
.v-application {
  background-color: #f5f5f5 !important;
  width: 100vw;
}

.banner-block {
  margin-top: 10px;
}

.top-title {
  margin-top: 10px;
}

.services-block {
  margin-top: 10px;
}

.view-more-block {
  text-align: center;
  margin-top: 20px;
}

.view-more {
  width: 120px;
  background-color: #f9f0e0 !important;
  color: #fea200 !important;
  font: 400 14px Roboto !important;
  margin-right: 8px;
  border: 1px solid #fea200 !important;
}
</style>
