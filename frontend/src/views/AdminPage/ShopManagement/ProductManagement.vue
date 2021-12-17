<template>
  <div class="shop-management-wrapper">
    <top-title :title="title"></top-title>
    <hr class="hr" />
    <div class="header__top-search-block">
      <input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        v-model="searchString"
      />
      <v-btn @click="search(searchString)">Tìm kiếm</v-btn>
    </div>
    <div class="shop-table" v-if="allProducts">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Thứ tự</th>
            <th>Sản phẩm</th>
            <th>Lượt xem</th>
            <th>Tồn kho</th>
            <th>Giá bán</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in allProducts" :key="index">
            <td>{{ product.id }}</td>
            <td class="product-name-img">
              <img
                :src="
                  'http://localhost:55000/apigateway/Products' +
                  product.thumbnailImage
                "
                alt=""
                width="40px"
                height="40px"
              />
              {{ product.name }}
            </td>
            <td>{{ product.viewCount }}</td>
            <td>{{ product.totalStock }}</td>
            <td>{{ product.price }}</td>
            <td>
          <v-btn icon 
           @click="productDetailForm(product.id)">
            <v-icon size="20px" color="#616161">fa-eye</v-icon>
          </v-btn>
              <!-- <v-dialog v-model="dialog" :retain-focus="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="deleteAlertForm">
                    <v-icon size="20px">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <confirm-dialog 
                :question="question"
                @agree-confirm-dialog="agree"
                @cancel-confirm-dialog="cancel"
                > </confirm-dialog>
              </v-dialog> -->
            </td>
          </tr>
        </tbody>
      </table>
      <v-dialog v-model="ShowProduct">
        <product-detail :eachProduct="oneProduct"></product-detail>
        <!-- <function-undevelop-form></function-undevelop-form> -->
      </v-dialog>
    </div>
    <div v-else>
      <no-content-form
        :showProduct="true"
        Notification="Không có sản phẩm nào cả"
      ></no-content-form>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue';
import { mapActions, mapGetters } from 'vuex';
import ProductDetail from '@/views/AdminPage/ShopManagement/ProductDetail.vue';

export default {
  // name: 'shop-management',
  components: {
    TopTitle,
    ProductDetail,
    //ConfirmDialog,
  },
  data() {
    return {
      title: 'Quản lý sản phẩm',
      ShowProduct: false,
      searchString: '',
      oneProduct: null,
    };
  },
  computed: {
    ...mapGetters({
      allProducts: 'GET_ALL_PRODUCTS',
      productDetail: 'GET_PRODUCT_DETAIL',
    }),
  },
  methods: {
    ...mapActions({
      getAllProducts: 'ACT_GET_ALL_PRODUCTS_FOR_ADMIN',
      getProductDetail: 'FETCH_PRODUCT_DETAIL'
    }),
    search(searchString) {
      this.getAllProducts({
        pageIndex: 1,
        pageSize: 10000,
        keyWord: searchString,
      });
    },
    async productDetailForm(productId) {
      await this.getProductDetail({id: productId});
      this.oneProduct = this.productDetail.resultObj;
      this.ShowProduct = true;
    },
  },
  created() {
    this.getAllProducts({ pageIndex: 1, pageSize: 10000, keyWord: ' ' });
  },
};
</script>

<style scoped>
.v-application p {
  margin-left: 0px;
}
.shop-management-wrapper {
  background-color: #ffffff;
  width: 940px;
  padding: 0px 20px;
}

.title-block {
  margin-top: 0px;
  margin-left: 0px;
}
.top-title {
  height: 44px;
  color: #616161;
  border-bottom: 1px solid #616161 !important;
}

.title-block .title p {
  margin-left: 0px !important;
}

.hr {
  margin-bottom: 5px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}

.header__top-search-block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__top-search-block label {
  width: 120px;
  font: 400 16px Roboto;
  color: #616161;
  padding: auto;
}

.header__top-search-block select {
  margin: 0 auto;
  color: #fea200;
  width: 200px;
  padding: 15px;
  height: 36px;
  margin-right: 10px;
  cursor: pointer;
  border: solid 2px #fea200;
  border-radius: 4px;
}

.header__top-search-block select:hover {
  background-color: #fea200;
  color: white;
  padding: 15px 5px 15px 25px;
}

.header__top-search-block option {
  background-color: white;
  color: #fea200;
  width: 310px;
  padding: 10px 15px;
  height: 20px;
  cursor: pointer;
}

.header__top-search-block option:hover {
  padding-left: 25px;
  width: 270px;
  background-color: #fea200;
  color: #fea200;
}

.header__top-search-block input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 36px;
  width: 520px;
  margin-left: 0;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.header__top-search-block input:focus {
  box-shadow: 0px 0px 8px #fea200;
}

.header__top-search-block .v-btn {
  height: 36px;
  color: #ffffff !important;
  margin-left: 8px;
  background-color: #fea200 !important;
  text-transform: none;
  font: 400 14px Roboto;
  letter-spacing: 0;
  box-shadow: none !important;
}
/* .shop-table {
  display: flex;
  flex-direction: column;
  column-gap: 20px;
  height: 32px;
  width: 100%;
}

.shop-table table th {
    border-collapse: collapse;
    margin: 25px 0;
    font: 500 14px Roboto;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
} */

.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font: 400 15px Roboto;
  width: 900px;
}

.styled-table thead tr {
  background-color: #fea200;
  color: #ffffff;
  text-align: left;
}

.styled-table th {
  padding: 12px 15px;
}

.styled-table td {
  padding: 3px 15px;
}
.product-name-img {
  display: flex;
  align-items: center;
  gap: 10px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
  font: 400 14px Roboto;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #fea200;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #fea200;
}
</style>
