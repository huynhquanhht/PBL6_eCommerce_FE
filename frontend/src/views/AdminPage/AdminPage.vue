<template>
  <div class="admin">
    <div class="sidebar-admin-block">
      <sidebar-admin class="sidebar-admin"></sidebar-admin>
    </div>
    <div class="admin-content"> 
      <div class="admin-sub">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>
<script>
import SidebarAdmin from '@/components/SidebarAdmin.vue';

export default {
  components: { 
    SidebarAdmin,
  },
};
</script>

<style scoped>

.sidebar-admin-block {
  position: relative;
}
.admin {
  height: 100%;
  display: grid;
  grid-template-columns: 220px 1fr;
  background-color: #f5f5f5;
}

.admin-content {
  margin-top: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.admin-sub {
  background-color: #ffffff;
  width: 940px;
}
</style>
