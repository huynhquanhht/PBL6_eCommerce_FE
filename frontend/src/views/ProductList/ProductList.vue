<template>
  <div class="all-bill-wrapper">
    <div>
      <div class="all-bill-title">
        <p class="main-title">Tất cả sản phẩm</p>
      </div>
      <hr class="all-bill-hr" />
      <div class="search-block">
        <label class="search-label" for="">Tìm kiếm theo: </label>
        <select class="search-select" name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <input class="search-input" type="text" name="" id="" />
        <v-btn class="search-button">Tìm kiếm</v-btn>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th style="width: 50px">Stt</th>
            <th style="width: 80px">Mã SP</th>
            <th style="width: 360px">Tên sản phẩm</th>
            <th style="width: 100px">Tồn kho</th>
            <th style="width: 120px">Giá gốc</th>
            <th style="width: 120px">Giá bán</th>
            <th style="width: 130px">Ngày tạo</th>
            <th style="width: 100px">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in allProducts" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.totalStock }}</td>
            <td>{{ product.originalPrice.toLocaleString('it-IT') }} đ</td>
            <td>{{ product.price.toLocaleString('it-IT') }} đ</td>
            <td>
              {{ new Date().toLocaleDateString('en-GB', product.dateCreated) }}
            </td>
            <td>
              <v-btn
                icon
                width="26px"
                height="26px"
                @click="updateProduct(product.id)"
              >
                <v-icon size="16px">fas fa-edit</v-icon>
              </v-btn>
              <v-btn
                icon
                width="26px"
                height="26px"
                @click="deleteProduct(product.id)"
              >
                <v-icon size="16px">fas fa-trash</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div
        v-else
        class="d-flex justify-center align-center"
        style="width: 100wm; height: 100vh"
      >
        <v-progress-circular
          :size="40"
          color="#fea200"
          indeterminate
        ></v-progress-circular>
      </div> -->
      <v-dialog v-model="dialog" width="400px">
        <confirm-dialog
          :question="question"
          @agree-confirm-dialog="agree"
          @cancel-confirm-dialog="cancel"
        ></confirm-dialog>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import localStorageUtils from '@/utils/utils-local-storage.js';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
export default {
  name: 'ProductList',
  components: { ConfirmDialog },
  data() {
    return {
      dialog: false,
      question: 'Bạn chắc chắn muốn xóa sản phẩm này?',
      productId: null,
    };
  },
  methods: {
    ...mapActions({
      getAllProducts: 'ACT_GET_ALL_PRODUCTS_SHOP',
      fetchDeleteProduct: 'DELETE_PRODUCT',
    }),
    async agree() {
      let res = await this.fetchDeleteProduct({ id: this.productId });
      if (res) {
        let shopInfo = JSON.parse(localStorageUtils.getShopInfo());
        await this.getAllProducts({
          pageIndex: 1,
          pageSize: 99,
          shopId: shopInfo.id,
        });
      }
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
    updateProduct(id) {
      this.$router.push(`/shop-chanel/update-product/${id}`);
    },
    deleteProduct(productId) {
      this.productId = productId;
      this.dialog = true;
    },
  },
  computed: {
    ...mapGetters({
      allProducts: 'GET_ALL_PRODUCTS',
    }),
  },
  async created() {
    let shopInfo = JSON.parse(localStorageUtils.getShopInfo());
    await this.getAllProducts({
      pageIndex: 1,
      pageSize: 99,
      shopId: shopInfo.id,
    });
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
}
.all-bill-wrapper {
  margin-top: 5px;
  padding: 10px 20px 10px 20px;
}

.main-title {
  text-transform: uppercase;
  font: 600 16px Roboto;
  color: #616161;
}

.all-bill-hr {
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
  color: #616161;
  margin: 5px 0px;
}

.search-block {
  display: grid;
  grid-template-columns: 120px 180px 280px 100px;
  align-items: center;
  column-gap: 10px;
}

.search-label {
}

.search-select {
  background-color: #ffffff !important;
  border-style: solid !important;
  -webkit-appearance: auto !important;
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 30px;
  width: 100%;
  outline: #616161;
  font: 400 15px Roboto;
  border-radius: 4px;
  cursor: pointer;
}

.search-select:focus {
  box-shadow: 0px 0px 4px #616161;
}

.search-input {
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 30px;
  width: 100%;
  outline: none;
  padding: 8px;
  font: 400 15px Roboto;
  border-radius: 4px;
}

.search-input:focus {
  box-shadow: 0px 0px 4px #616161;
}

.search-button {
  height: 32px !important;
  background-color: #fea200 !important;
  letter-spacing: 0px !important;
  text-transform: none !important;
  color: #ffffff !important;
  font: 400 16px Roboto;
  box-shadow: none !important;
}

.styled-table {
  border-collapse: collapse;
  margin: 5px 0;
  font: 400 15px Roboto;
}

.styled-table thead tr {
  background-color: #fea200;
  color: #ffffff;
  text-align: center;
  border: solid 1px #616161;
}

.styled-table th,
.styled-table td {
  padding: 3px 10px;
  border: solid 1px #616161;
  text-align: center;
}
</style>
