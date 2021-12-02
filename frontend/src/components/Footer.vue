<template>
  <div class="wrapper">
    <div class="footer">
      <img class="logo-versace" src="@/assets/images/logo_bag.svg" alt="logo-bag">
      <p class="main-title">VERSACE VIỆT NAM</p>
      <p>Địa chỉ văn phòng: 02 Ngô Quyền, phường Nại Hiên Đông, quận Sơn Trà, thành phố Đà Nẵng </p>
      <p>Versace nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng </p>
      <p>© 2021 - Bản quyền của Công Ty Cổ Phần Versace - versace.vn</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 150px;
  border-top: 2px solid #fea200;
  background-color: #ffffff;
  padding: 15px 0px;
  margin-top: 100px;
}
.footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

}

.main-title {
  font: 700 13px Roboto;
}

.logo-versace {
  width: 40px;
}

.footer p {
  color: #616161;
  margin-bottom: 0px;
  font: 400 13px Roboto;
  line-height: 20px;
}
</style>