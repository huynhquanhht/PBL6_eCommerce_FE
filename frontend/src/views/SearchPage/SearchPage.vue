<template>
  <v-app>
    <div v-if="allProducts">
      <product-card-list :productList="allProducts"></product-card-list>
      <div class="view-more-block">
        <v-pagination v-model="page" :length="pageCount" @input="newPage">
        </v-pagination>
      </div>
    </div>
     <div
      v-else
      class="d-flex justify-center align-center"
      style="width: 100wm; height: 70vh"
    >
      <v-progress-circular
        :size="30"
        color="#fea200"
        indeterminate
      ></v-progress-circular>
   </div>
  </v-app>
</template>

<script>
import ProductCardList from '@/components/ProductCardList.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    ProductCardList,
  },
  props: {
    searchString: { type: String },
    gender: { type: String },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      newPageGender: 0,
      newPageSearchString: '',
    };
  },
  methods: {
    ...mapActions({
      getAllProducts: 'ACT_GET_TOTAL_PRODUCTS',
    }),
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    async newPage(value) {
      this.page = value;
      await this.getAllProducts({
        pageIndex: this.page,
        pageSize: 18,
        keyword: this.newPageSearchString,
        gender: this.newPageGender,
      });
    },
  },
  computed: {
    ...mapGetters({
      allProducts: 'GET_ALL_PRODUCTS',
      totalProducts: 'GET_TOTAL_PRODUCTS',
    }),
  },
  watch: {
    async searchString(value) {
        await this.getAllProducts({
        pageIndex: this.page,
        pageSize: 18  ,
        keyword: value,
        gender: 0,
      });
    },
    allProducts() {

    }
  },
  async created() {
      await this.getAllProducts({
        pageIndex: this.page,
        pageSize: 18,
        keyword: this.searchString,
        gender: parseInt(this.gender),
      });
      this.pageCount = this.totalProducts.pageCount;
      this.newPageGender = parseInt(this.gender);
      this.newPageSearchString = this.searchString;
      console.log(this.allProducts);
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
