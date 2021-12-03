<template>
  <div class="shop-owner">
    <div class="sidebar-shop-block">
      <sidebar-shop class="sidebar-shop"></sidebar-shop>
    </div>
    <div class="shop-owner-content"> 
      <div class="shop-owner-sub">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarShop from '@/components/SidebarShop'
export default {
  components: { SidebarShop}
}
</script>

<style scoped>

.sidebar-shop-block {
  position: relative;
}
.shop-owner {
  height: 100%;
  display: grid;
  grid-template-columns: 220px 1fr;
  background-color: #f5f5f5;
}

.shop-owner-content {
  margin-top: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.shop-owner-sub {
  background-color: #ffffff;
  width: 1100px;
}
</style>