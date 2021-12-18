<template>
  <div class="sidebar-admin-wrapper">
    <div class="item-group">
      <div class="item" v-for="(item, index) in menuItems" :key="index">
        <router-link :to="item.url" class="item">
        <i :class="item.icon"></i>
        <span> {{ item.title }} </span>   
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SidebarPersonal',
  
  data() {
    return {
      menuItems: [
        {
          icon: 'fas fa-store',
          title: 'Quản Lý cửa hàng',
          url: '/admin/shop-management',   
        },
        {
            icon: 'fas fa-tshirt',
            title: 'Quản lý sản phẩm',
            url: '/admin/product-management', 
        },
        {
            icon: 'fas fa-paste',
            title: 'Quản lý đơn hàng',
            url: '/admin/order-management',
        },
        {
          icon: 'fas fa-user-circle',
          title: 'Quản lý tài khoản',
          url: '/admin/account-management',

        }
      ],
      active: false,
      loginStatus: false,
    };
  },
  
};
</script>

<style scoped>
.sidebar-admin-wrapper {
  height: 100vh;
  width: 250px;
  padding: 20px 20px;
  background-color: #ffffff;
}

.item {
  display: grid;
  grid-template-columns: 20px 120px;
  column-gap: 5px;
  color: #616161;
  text-decoration: none;
}

.item-group {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  row-gap: 10px;
  justify-content: center;
  margin-left: 20px;
}

.item i {
  font-size: 20px;
  margin-right: 20px;
}

.item span {
  font: 400 15px Roboto;
  line-height: 24px;
}

.item:hover
{
  color: #fea200;
  cursor: pointer;
}
</style>
