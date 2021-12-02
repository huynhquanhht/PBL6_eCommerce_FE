<template>
  <div class="extra-header">
    <div class="ecommerce-name ml-5">
      <a href="/">
        <img
          class="logo-header"
          src="../assets/images/logo_header.svg"
          alt="logo_header"
        />
      </a>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
};
</script>

<style scoped>
.extra-header {
  background-color: #ffffff;
  box-shadow: #616161;
  height: 60px !important;
  display: flex;
  align-items: center;
  justify-content: left;
  box-shadow: 1px 1px 2px #616161;
  position: fixed;
  z-index: 20;
}

.logo-header {
  height: 44px;
  margin-top: 6px;
}

.ecommerce-name {
  display: flex;
  align-items: center;
}

.ecommerce-name span {
  color: #616161;
  font: 500 22px Roboto;
  margin-left: 5px;
  margin-top: 7px;
}
</style>
