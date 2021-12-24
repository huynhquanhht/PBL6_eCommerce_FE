<template>
  <div class="shop-info-wrapper">
    <div v-if="title">
      <div class="shop-info-title">
        <p class="main-title">{{ title.main }}</p>
        <p class="extra-title">{{ title.extra }}</p>
      </div>
      <hr class="shop-info-hr" />
      <shop-info-form
        :shopInfo="shopInfoChecked"
        :formType="formType"
      ></shop-info-form>
    </div>
    <div
      v-else
      class="d-flex justify-center align-center"
      style="width: 100wm; height: 60vh"
    >
      <v-progress-circular
        :size="40"
        color="#fea200"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import localStorageUtils from '@/utils/utils-local-storage.js';
import ShopInfoForm from './ShopInfoForm.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'ShopInfo',
  components: { ShopInfoForm },
  computed: {
    ...mapGetters({
      shopInfo: 'GET_SHOP_INFO',
    }),
  },
  data() {
    return {
      shopInfoChecked: null,
      title: null,
      formType: null,
    };
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      fetchShopInfo: 'FETCH_SHOP_INFO',
    }),
  },
  async created() {
    await this.fetchShopInfo();
    if (this.shopInfo) {
      localStorageUtils.getInstance().setShopInfo(JSON.stringify({id: this.shopInfo.shopId}));
      if (!this.shopInfo.disable) {
        this.shopInfoChecked = this.shopInfo;
        this.formType = this.detail;
        this.title = {
          type: 'detail',
          main: 'Thông tin chi tiết cửa hàng',
          extra: 'Thay đổi thông tin và cập nhật bên dưới!',
        };
      } 
    } else {
      this.formType = 'register';
      this.title = {
        type: 'register',
        main: 'Đăng ký cửa hàng',
        extra: 'Hãy đăng ký cửa hàng để trở thành người bán',
      };
    }
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
}

.shop-info-wrapper {
  margin-top: 10px;
  padding: 10px 20px 10px 20px;
}
.main-title,
.extra-title {
  color: #616161;
}

.main-title {
  text-transform: uppercase;
  font: 600 16px Roboto;
}

.shop-info-form {
  margin-top: 48px;
  margin-left: 200px;
}

.shop-info-hr {
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
  color: #616161;
  margin: 5px 0px;
}
</style>
