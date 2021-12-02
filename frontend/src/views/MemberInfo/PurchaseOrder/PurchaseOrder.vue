<template>
  <div class="purchase-order-wrapper">
    <top-title :title="title"></top-title>

    <div class="options">
          <hr class="hr-purcharse-order" />
      <v-tabs v-model="tab" height="32px">
        <v-tabs-slider color="#fea200"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>      
    </div>
          <order></order>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue';
import Order from './Order.vue';

export default {
  components: { TopTitle, Order },
  data() {
    return {
      title: 'Đơn mua',
      tab: null,
      items: ['Tất cả', 'Chờ xác nhận', 'Đã giao', 'Đã hủy'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };
  }
};
</script>

<style scoped>
.v-application p {
  margin-left: 0px;
}
.purchase-order-wrapper {
  /* background-color: #ffffff; */
  /* padding: 0 20px; */
  width: 940px;
}

.title-block {
  margin-top: 0px;
  margin-left: 0px;
}
.top-title {
  height: 44px;
  color: #616161;
  border-bottom: 1px solid #616161 !important;
}

.title-block .title p {
  margin-left: 0px !important;
}

.hr-purcharse-order {
  margin-bottom: 5px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;

}

.options {
  display: flex;
  flex-direction: column;
  column-gap: 20px;
  height: 40px;
  width: 100%;
  background-color: #ffffff;
  padding: 0px 20px 0px 20px;
}

.v-tab {
  text-transform: none;
  letter-spacing: 0;
  font: 500 16px Roboto !important;
  color: #616161 !important;
}


</style>
