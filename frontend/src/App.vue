<template>
 <transition 
    name="fade"
    mode="out-in">
    <router-view class="view"></router-view>
  </transition>

</template>
<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.15s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
