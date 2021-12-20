<template>
  <div class="member-info-wrapper">
    <div class="member-info">
      <sidebar-member></sidebar-member>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SidebarMember from '@/components/SidebarMember.vue';
export default {
  components: { SidebarMember },
  name: 'MemberInfo'
};
</script>

<style scoped>
.member-info-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.member-info {
  width: 1200px;
  display: grid;
  grid-template-columns: 250px 1940px;
  column-gap: 10px;
  margin-top: 10px;
}
</style>
