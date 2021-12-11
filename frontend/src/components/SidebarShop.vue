<template>
  <div class="sidebar-shop-wrapper">
    <div class="sidebar-shop">
      <div class="item-group">
        <div class="item" v-for="(item, index) in menuItems" :key="index">
          <div class="item-menu">
            <i :class="item.icon"></i>
            <span> {{ item.title }} </span>
          </div>
          <router-link
            v-for="(itemChild, index) in item.childTitle"
            :key="index"
            :to="itemChild.url"
            class="anchor"
          >
            <p class="item-child">
              {{ itemChild.name }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarShop',
  data() {
    return {
      menuItems: [
        {
          icon: 'fas fa-store',
          title: 'Quản lý shop',
          childTitle: [
            {
              url: '/shop-chanel/shop-info',
              name: 'Hồ sơ shop',
            },
          ],
        },
        {
          icon: 'fas fa-shopping-bag',
          title: 'Quản lý sản phẩm',
          childTitle: [
            {
              url: '/shop-chanel/product-list',
              name: 'Tất cả sản phẩm',
            },
            {
              url: '/shop-chanel/add-product',
              name: 'Thêm sản phẩm',
            },
          ],
        },
        {
          icon: 'fas fa-clipboard-list',
          title: 'Quản lý đơn hàng',
          childTitle: [
            {
              url: '',
              name: 'Tất cả',
            },
            {
              url: '',
              name: 'Chưa xác nhận',
            },
            {
              url: '',
              name: 'Đã xác nhận',
            },
            {
              url: '',
              name: 'Đã hủy',
            },
          ],
        },
      ],
      active: false,
    };
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px !important;
}
.sidebar-shop-wrapper {
  height: 100vh;
  width: 220px;
  padding: 10px 20px;
  background-color: #ffffff;
  display: flex;
  position: relative;
}

.sidebar-shop {
  position: fixed;
  z-index: 10;
}
.personal-account {
  display: flex;
  column-gap: 10px;
  align-items: center;
}
.personal-account img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #fea200;
}
.personal-identity {
  display: flex;
  flex-direction: column;
}

.personal-identity span {
  color: #616161;
}

.personal-identity span:first-child {
  font: 600 15px Roboto;
}

.personal-identity span:last-child {
  font: 400 15px Roboto;
}

.hr {
  margin: 10px 0px;
  border-width: 0;
  padding-top: 1px;
  background-color: #b6b4b4;
}

.item {
  color: #616161;
  text-decoration: none;
}

.item-group {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  row-gap: 10px;
  z-index: 10;
  margin-left: 10px;
}

.item-menu {
  display: grid;
  grid-template-columns: 20px 120px;
  column-gap: 5px;
  cursor: context-menu;
}

.item i {
  font-size: 18px;
}

.item span {
  font: 400 15px Roboto;
  line-height: 24px;
}

.item-child {
  margin-left: 26px;
  font: 400 15px Roboto;
  line-height: 24px;
  text-decoration: none;
  color: #616161;
}

.item-child:hover {
  color: #fea200;
  cursor: pointer;
}

.anchor {
  text-decoration: none;
}

/* .item:hover
{
  color: #fea200;
  cursor: pointer;
} */
</style>
