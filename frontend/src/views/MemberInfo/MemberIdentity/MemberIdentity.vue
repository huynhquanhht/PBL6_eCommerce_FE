<template>
  <div class="member-identity-wrapper">
    <top-title :title="title"></top-title>
    <hr class="hr">
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  components: { TopTitle },
  data() {
    return {
      title: 'Thông tin cá nhân'
    }
  }

}
</script>

<style scoped>
.member-identity-wrapper {
  background-color: #ffffff;
  width: 940px;
  height: 500px;
}

.hr {
  margin-bottom: 5px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}


</style>