<template>
  <div class="title-block">
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <hr class="hr">
  </div>
</template>

<script>
export default {
  name: 'TopTitle',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px !important;
  display: flex;
  align-items: center;
}
.title-block {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.title {
  height: 44px;
  width: 1200px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
}

.title p {
  margin-left: 20px;
  color: #fea200;
  text-transform: uppercase;
  font: 500 16px Roboto;
}
</style>
