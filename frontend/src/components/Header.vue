<template>
  <div class="header-block">
    <div class="header">
      <div class="header__top">
        <div class="header__top-main">
          <div class="header__top-logo">
            <a href="/">
              <img
                class="logo-header"
                src="../assets/images/logo_header.svg"
                alt="logo_header"
              />
            </a>
          </div>
          <div class="header__top-search-block">
            <input type="text" 
            placeholder="Tìm kiếm sản phẩm mong muốn..."
            v-model="searchString"
            />
            <v-btn id="search" @click="search()">Tìm kiếm</v-btn>
          </div>
          <div class="header__top-cart-store">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" icon @click="selectCart">
                  <v-badge right color="red" size="16" :value="cartQuantity" :content="cartQuantity">
                    <v-icon size="28">mdi-cart</v-icon>
                  </v-badge>
                </v-btn>
              </template>
              <span>Giỏ hàng</span>
            </v-tooltip>
            <div class="header__top-cart-quantity"></div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" icon @click="selectShop">
                  <v-icon size="24">fas fa-store</v-icon>
                </v-btn>
              </template>
              <span>Kênh người bán</span>
            </v-tooltip>
          </div>
          <div class="header__top-user-block" v-if="!loginStatus">
            <v-icon size="28">fas fa-user</v-icon>
            <div>
              <router-link to="/login" class="login-link">
                <span>
                  Đăng nhập
                </span>
              </router-link>
              <router-link to="/signup" class="signup-link">
                <span>
                  Đăng ký
                </span>
              </router-link>
            </div>
          </div>
          <div class="personal-account-block" v-if="loginStatus && userInfo">
            <v-menu offset-y open-on-hover :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <div class="personal-account" v-bind="attrs" v-on="on">
                  <img
                    src="@/assets/images/avatar-user.png"
                    alt="avatar-user"
                  />
                  <div class="personal-identity">
                    <span> {{ userInfo.fullname }}</span>
                  </div>
                </div>
              </template>
              <div class="account-menu">
                <v-list>
                  <v-list-item
                    v-for="(item, index) in accountMenu"
                    :key="index"
                    class="menu"
                    @click="selectPersonalOption(item)"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-menu>
          </div>
        </div>
      </div>
      <div class="header__menu">
        <div class="header__menu-main">
          <ul>
            <li>
              <v-btn>
                Trang chủ
              </v-btn>
            </li>
            <li class="male">
              <v-menu offset-y open-on-hover :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="menu-title">
                    Nam
                  </v-btn>
                </template>
                <div class="menu-list">
                  <v-list
                    v-for="(item, index) in male"
                    :key="index"
                    class="menu"
                  >
                    <p class="product-category">{{ item.category }}</p>
                    <v-list-item v-for="(product, j) in item.products" :key="j">
                      <v-list-item-title >
                        <a :href="product.url" class="product-title">
                        {{ product.name }}
                        </a>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
              </v-menu>
            </li>
            <li class="male">
              <v-menu offset-y open-on-hover :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="menu-title">
                    Nữ
                  </v-btn>
                </template>
                <div class="menu-list">
                  <v-list
                    v-for="(item, index) in female"
                    :key="index"
                    class="menu"
                  >
                    <p class="product-category">{{ item.category }}</p>
                    <v-list-item v-for="(product, j) in item.products" :key="j">
                      <v-list-item-title>
                        <a :href="product.url" class="product-title">
                        {{ product.name }}
                        </a>
                        </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
              </v-menu>
            </li>
            <li>
              <v-btn>
                Hỗ trợ
              </v-btn>
            </li>
            <li>
              <v-btn>
                Giới thiệu
              </v-btn>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localStorageUtils from '@/utils/utils-local-storage.js'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'Header',
  props: {
    currentUser: { type: Object },
  },
  data() {
    return {
      searchString: '',
      loginStatus: false,
      hide: true,
      male: [
        {
          category: 'Áo',
          products: [
            {name: 'Áo thun', url: 'search-page?searchString=Áo thun&gender=1'}, 
            {name: 'Áo sơ mi', url:'search-page?searchString=Áo sơ mi&gender=1'}, 
            {name: 'Áo Hoodie', url:'search-page?searchString=Áo Hoodie&gender=1'}, 
            {name: 'Áo khoác', url:'search-page?searchString=Áo khoác&gender=1'}
            
          ],
        },
        {
          category: 'Quần',
          products: [
            {name: 'Quần Jean', url: 'search-page?searchString=Quần Jean&gender=1'}, 
            {name: 'Quần tây',  url: 'search-page?searchString=Quần tây&gender=1'},
            {name: 'Quần đùi', url: 'search-page?searchString=Quần đùi&gender=1'},
          ],
        },
        {
          category: 'Phụ kiện',
          products: [
            {name: 'Đồ lót', url: 'search-page?searchString=lót&gender=1'},
            {name: 'Thắt lưng',url: 'search-page?searchString=Thắt lưng&gender=1'}, 
            {name: 'Mũ/Nón', url: 'search-page?searchString=Mũ&gender=1'},
          ],
        },
      ],
      female: [
        {
          category: 'Áo',
          products: [
            {name: 'Áo thun', url: 'search-page?searchString=Áo thun&gender=2'}, 
            {name: 'Áo sơ mi', url: 'search-page?searchString=Áo sơ mi&gender=2'}, 
            {name: 'Áo Hoodie', url: 'search-page?searchString=Áo Hoodie&gender=2'},  
            {name: 'Áo khoác', url: 'search-page?searchString=Áo khoác&gender=2'},
          ],
        },
        {
          category: 'Quần',
          products: [
            {name: 'Quần Jean', url: 'search-page?searchString=Quần Jean&gender=2'}, 
            {name: 'Quần tây',  url: 'search-page?searchString=Quần tây&gender=2'},
            {name: 'Quần đùi', url: 'search-page?searchString=Quần đùi&gender=2'},
            ],
        },
        {
          category: 'Váy/ Đầm',
          products: [
            {name: 'Váy', url: 'search-page?searchString=Váy&gender=2'}, 
            {name: 'Đầm', url: 'search-page?searchString=Đầm&gender=2'},
            ],
        },
        {
          category: 'Phụ kiện',
          products: [
            {name: 'Đồ lót', url: 'search-page?searchString=lót&gender=2'},
            {name: 'Thắt lưng',url: 'search-page?searchString=Thắt lưng&gender=2'}, 
            {name: 'Mũ/Nón', url: 'search-page?searchString=Mũ&gender=2'},
            ],
        },
      ],
      accountMenu: ['Thông tin cá nhân', 'Đơn mua', 'Đăng xuất'],
    };
  },
  computed: {
    ...mapGetters({
      cartQuantity: 'GET_CART_QUANTITY',
      userInfo: 'GET_USER_INFO'
    })
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
      setCartQuantity: 'SET_CART_QUANTITY',
    }),
    ...mapActions({
      fetchCartQuantity: 'FETCH_CART_QUANTITY',
      fetchUserInfo: 'FETCH_USER_INFO'
    }),
    selectCart() {
      if (this.loginStatus) {
        this.$router.push(`/cart`);
      } else {
       this.setSnackbar({
          type: 'warning',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
          visible: true,
        });
      }
    },
    selectShop() {
        if (this.loginStatus) {
        this.$router.push({name: 'shop-info'});
      } else {
       this.setSnackbar({
          type: 'warning',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
          visible: true,
        });
      }
    },
    selectPersonalOption(option) {
      if (option === 'Thông tin cá nhân') {
        // this.$router.push(`/`);
      }
      if (option === 'Đơn mua') {
        // this.$router.push(`/`);
      }
      if (option === 'Đăng xuất') {
        localStorageUtils.clearToken();
        this.$router.go('/');
      }
    },
    search() {
      console.log(this.searchString);
      // var input = document.getElementById("search");
      // input.addEventListener("keyup" , function(event) {
      //   if(event.keyCode === 13) {
      //     event.preventDefault();
      //     this.$router.replace(`search-page?searchString=${this.searchString}&gender=0`);
      //   }
      // });
      this.$router.replace(`search-page?searchString=${this.searchString}&gender=0`);
    }
  },
  // watch: {
  //   searchString() {
  //     this.$router.push(`search-page?searchString=${this.searchString}`);
  //   }
  // },
  async created() {
    if (localStorageUtils.getToken()) {
      this.loginStatus = true;
      await this.fetchCartQuantity();
      await this.fetchUserInfo();
    }
  }
};
</script>

<style scoped>
.v-application--wrap {
  position: none;
}
.v-application p {
  margin-bottom: 0px;
}
.v-btn {
  text-transform: none !important;
  font: 400 16px Roboto !important;
  letter-spacing: 0;
}
.menu-list {
  display: flex;
  column-gap: 40px;
  padding: 10px 40px;
  background-color: #ffffff;
  box-shadow: none !important;
}
.menu-title {
  align-self: center;
  box-shadow: none !important;
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: none !important;
}
.product-title {
  text-decoration: none;
  color: #616161;
}
.product-title:hover {
  color: #fea200;
}
.product-category {
  margin-bottom: 20px !important;
  font: 500 16px Roboto;
  color: #fea200;
}
.v-list-item {
  cursor: pointer;
  display: unset;
  flex: none;
  padding: 0px;
  min-height: 40px !important;
}
.v-list-item__title {
  font: 400 16px Roboto;
}
.v-list-item__title:hover {
  color: #fea200;
}
.header-block {
  margin-bottom: 110px;
}
.header {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 10;
}
.logo-header {
  height: 48px;
  margin-top: 3px;
}
.header__top-main {
  height: 72px;
  background-color: #f5f5f5;
  display: inline-grid;
  grid-template-columns: 200px 700px 170px 130px;
  align-items: center;
}
.header__top-logo {
  text-align: center;
}
.header__top-logo a {
  height: 100%;
  font: bold 30px Roboto;
  cursor: pointer;
}
.header__top-logo a span:first-child {
  color: #616161;
}
.header__top-logo a span:last-child {
  color: #fea200;
}
.header__top-search-block {
  display: flex;
  align-items: center;
}
.header__top-search-block input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 36px;
  width: 580px;
  margin-left: 20px;
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
}
.header__top-cart-store {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__top-cart-store .v-btn {
  width: 50px;
  height: 50px;
  margin: 0 8px 0 8px;
}
.header__top-cart-store .v-icon,
.header__top-user-block .v-icon {
  color: #fea200 !important;
}
.header__top-user-block span {
  text-decoration: none;
}
.header__top-user-block span:hover {
  text-decoration: underline;
}
.header__top-user-block {
  display: flex;
}
.header__top-user-block div {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
}
.header__top-user-block div a {
  font: bold 14px Roboto;
  color: #616161;
  text-decoration: none;
}
.personal-account:hover {
  text-decoration: underline;
  cursor: pointer;
}
.personal-account {
  display: flex;
  column-gap: 5px;
  align-items: center;
}
.personal-account img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #fea200;
}
.personal-identity {
  display: flex;
  flex-direction: column;
}
.personal-identity span {
  color: #616161;
  font: 400 12px Roboto;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.personal-account-block {
}
.account-menu {
  padding: 0px 0px;
  background-color: #ffffff;
  box-shadow: none !important;
}
.account-menu .v-list {
  box-shadow: none !important;
}
.account-menu .v-list-item__title {
  font: 400 14px Roboto;
  color: #616161;
  line-height: 32px;
  padding: 0px 20px;
}
.account-menu .v-list-item__title:hover {
  color: #fea200;
  background-color: #eceaea;
}
.account-menu .v-list-item__title:active {
  background-color: #dbdada;
}
.account-menu .v-list-item:hover {
}
.header__menu {
  background-color: #fea200;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}
.header__menu-main {
  width: 1200px;
}
.header__menu-main ul {
  list-style-type: none;
  display: flex;
  height: 100%;
}
.header__menu-main ul li {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__menu-main ul a {
  color: #ffffff;
  font: 400 18px Roboto;
}
.header__menu-main ul .v-btn {
  width: 108px;
  height: 40px;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: #fea200 !important;
  color: #ffffff !important;
  font: 500 16px Roboto !important;
}
</style>