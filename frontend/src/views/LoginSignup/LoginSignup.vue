<template>
    <v-main>
      <v-container fluid class="d-flex mg-auto">
        <div class="left-content">
          <img class="logo-bag-title" src="@/assets/images/logo_bag_title.svg" alt="logo_bag">
          <p class="introduction">
            Nền tảng thương mại điện tử thời trang hàng đầu.
          </p>
        </div>
        <div class="right-content">
          <router-view></router-view>
        </div>
      </v-container>
    </v-main>
</template>

<script>

export default {

  name: "LoginSignup",
  data() {
    return {
      show: false,
    };
  },

};
</script>
<style scoped>

.v-main {
  background-color: #fea200;
  display: flex;
  align-items: center;
}

.left-content, .right-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.left-content {
  display: flex;
  flex-direction: column;
  align-items: center;  
}

.logo-bag-title {
  height: 180px;
  margin-bottom: 20px;
}

.ecommerce-name span {
  font: 700 27px Roboto;
}
.ecommerce-name span:last-child {
  color: #fea200;
}
.introduction {
  color: #ffffff;
  font: 400 24px Roboto;
  text-align: center;
}
</style>
