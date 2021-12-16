<template>
  <div class="banner-block">
    <div class="banner">
      <div class="left">
        <img src="@/assets/images/image-banner-left.jpg" alt="" />
      </div>
      <div class="right">
        <img
          class="top-right"
          src="@/assets/images/image-banner-top-right.jpg"
          alt=""
        />
        <img
          class="bottom-right"
          src="@/assets/images/image-banner-bottom-right.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner-block {
  display: flex;
  justify-content: center;
}
.banner {
  display: flex;
  width: 1200px;
}
.left img {
  height: 320px;
  width: 860px;
  border: 8px solid #ffffff;
}
.right {
  display: flex;
  flex-direction: column;
}
.top-right,
.bottom-right {
  height: 150px;
  width: 320px;
  margin-left: 20px;
  border: 8px solid #ffffff;
}

.bottom-right {
  margin-top: 20px;
}
</style>
