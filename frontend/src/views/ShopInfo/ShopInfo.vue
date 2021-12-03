<template>
  <div class="shop-info-wrapper">
    <div class="shop-info-title">
      <p class="main-title">{{ title.main }}</p>
      <p class="extra-title"> {{ title.extra }}</p>
    </div>
    <hr class="shop-info-hr">
      <shop-info-form v-if="shopInfo" :shopInfo="shopInfoChecked" :formType="formType"></shop-info-form>
  </div>
</template>

<script>
import ShopInfoForm from './ShopInfoForm.vue'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'ShopInfo',
  components: { ShopInfoForm },
  computed: {
    ...mapGetters({
      shopInfo: 'GET_SHOP_INFO',
      title: null,
    })
  },
  data() {
    return {
      shopInfoChecked: null,
      title: null,
      formType: null
    }
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      fetchShopInfo: 'FETCH_SHOP_INFO'
    })
  },
  async created() {
    await this.fetchShopInfo();

    if (shopInfo) {
      if (!shopInfo.disable) {
        this.shopInfoChecked = this.shopInfo;
        this.formType = detail;
        this.title = {
          type: 'detail',
          main: 'Thông tin chi tiết cửa hàng',
          extra: 'Thay đổi thông tin và cập nhật bên dưới!'
        }
      } else {
        // Active shop
        this.shopInfoChecked = this.shopInfo;
        this.formType = 'active';
        this.title = {
          type: 'active',
          main: 'Thông tin chi tiết cửa hàng',
          extra: 'Cửa hàng hiện tại chưa kích hoạt. Nhấn kích hoạt để mở lại cửa hàng'
        }
      }
    } else {
      // Register shop
        this.formType = 'register';
        this.title = {
          type: 'register',
          main: 'Đăng ký cửa hàng',
          extra: 'Hãy đăng ký cửa hàng để trở thành người bán'
        }
    }
  }
}
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
.extra-title
{
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