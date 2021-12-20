<template>
  <div class="services-block">
    <div class="services-list">
      <div class="service">
        <div class="service-icon">
          <v-icon size="28px">{{ services[0].icon }}</v-icon>
        </div>
        <div class="service-text">
          <h4 class="service-title">{{ services[0].title }}</h4>
          <p class="service-detail">{{ services[0].detail }}</p>
        </div>
      </div>
      <div class="hr"></div>
      <div class="service">
        <div class="service-icon">
          <v-icon size="28px">{{ services[1].icon }}</v-icon>
        </div>
        <div class="service-text">
          <h4 class="service-title">{{ services[1].title }}</h4>
          <p class="service-detail">{{ services[1].detail }}</p>
        </div>
      </div>
      <div class="hr"></div>
      <div class="service">
        <div class="service-icon">
          <v-icon size="28px">{{ services[2].icon }}</v-icon>
        </div>
        <div class="service-text">
          <h4 class="service-title">{{ services[2].title }}</h4>
          <p class="service-detail">{{ services[2].detail }}</p>
        </div>
      </div>
      <div class="hr"></div>
      <div class="service">
        <div class="service-icon">
          <v-icon size="28px">{{ services[3].icon }}</v-icon>
        </div>
        <div class="service-text">
          <h4 class="service-title">{{ services[3].title }}</h4>
          <p class="service-detail">{{ services[3].detail }}</p>
        </div>
      </div>
      <div class="hr"></div>
      <div class="service">
        <div class="service-icon">
          <v-icon size="28px">{{ services[4].icon }}</v-icon>
        </div>
        <div class="service-text">
          <h4 class="service-title">{{ services[4].title }}</h4>
          <p class="service-detail">{{ services[4].detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      services: [
        {
          icon: 'mdi-rocket-launch',
          title: 'Miễn phí vận chuyển',
          detail: 'Tất cả đơn hàng từ 500.000',
        },
        {
          icon: 'mdi-cached',
          title: 'Gửi trả trong 30 ngày',
          detail: 'Nếu sản phẩm lỗi',
        },
        {
          icon: 'mdi-card-bulleted',
          title: 'Thanh toán an toàn',
          detail: 'Nhiều phương thức thanh toán',
        },
        {
          icon: 'mdi-comment-multiple',
          title: 'Hỗ trợ 24/7',
          detail: 'Phản hồi nhanh chóng',
        },
        {
          icon: 'mdi-gift',
          title: 'Dịch vụ quà tặng',
          detail: 'Hỗ trợ tặng quà',
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
}
.services-block {
  display: flex;
  justify-content: center;
  padding: 0px 24px;
}
.services-list {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 1200px;
  border: 1px solid #c5c3c3;
}

.service {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 100%;
  background-color: #ffffff;
}

.service:nth-child(1) {
  border: none;
}

.service-icon .v-icon {
  color: #fea200 !important;
  margin-right: 10px;
}

.service-title {
  font: 600 14px Roboto;
  margin-bottom: 2px;
}

.service-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.service-detail {
  font: 400 12px Roboto;
  color: #616161;
}

.hr {
  height: 48px;
  width: 1px;
  background-color: #616161;
}
</style>
