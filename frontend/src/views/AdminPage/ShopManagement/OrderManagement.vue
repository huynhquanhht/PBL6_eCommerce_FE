<template>
  <div class="shop-management-wrapper">
    <top-title :title="title"></top-title>
    <hr class="hr" />
    <div class="header__top-search-block">
      <label>Từ ngày: </label>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="datePicker1"
        transition="scale-transition"
        offset-y
        min-width="270px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="datePicker1"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            color="#fea200"
            height="36px"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datePicker1"
          scrollable
          width="270px"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
          color="#fea200"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu1 = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu1.save(datePicker1)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <label>Đến ngày: </label>
      <v-menu
        ref="menu2"  
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="datePicker2"
        transition="scale-transition"
        offset-y
        min-width="270px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="datePicker2"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            color="#fea200"
            height="36px"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datePicker2"
          scrollable
          width="270px"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
          color="#fea200"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu2 = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu2.save(datePicker2)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-btn @click="search(datePicker1, datePicker2)">Tìm kiếm</v-btn>
    </div>
    <div class="shop-table" v-if="allOrders">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên người mua</th>
            <th>Tên cửa hàng</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Tổng hóa đơn</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in allOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.shipName }}</td>
            <td>{{ order.shopName }}</td>
            <td>{{ order.state }}</td>
            <td>{{ order.orderDate.slice(0,10) }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>
              <v-btn 
              icon
              @click="orderDetailForm(order)">
                <v-icon size="16px">fa-eye</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <v-dialog 
      content-class="elevation-0" 
      v-model="orderDetail">
        <order-detail
        :eachOrder="oneOrder"
        ></order-detail>
      </v-dialog>
    </div>
    <div v-else
    class="d-flex justify-center align-center"
      style="width: 100wm; height: 100vh">
      <no-content-form
        :showOrder="true"
        Notification="Không có dữ liệu hóa đơn"
      ></no-content-form>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue';
import OrderDetail from './OrderDetail.vue';
import NoContentForm from '@/components/NoContentForm.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    TopTitle,
    OrderDetail,
    NoContentForm,
  },
  data() {
    return {
      title: 'Quản lý hóa đơn',
      orderDetail: false,
      datePicker1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      datePicker2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      oneOrder: null,
      searchFromDay: '',
      searchToDay: '',
    };
  },
  computed: {
    ...mapGetters({
      allOrders: 'GET_ALL_ORDERS',
    }),
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      getAllOrders: 'ACT_GET_ALL_ORDERS',
    }),
    async search(fromDate, toDate) {
      var fromDay = fromDate.slice(8,10);
      var fromMonth = fromDate.slice(5,7);
      var fromYear = fromDate.slice(0,4);

      var toDay = toDate.slice(8,10);
      var toMonth = toDate.slice(5,7);
      var toYear = toDate.slice(0,4);
      
      if(fromDay > toDay || fromMonth > toMonth || fromYear > toYear){
        this.setSnackbar({
          type: 'warning',
          visible: true,
          text: "Từ ngày không thể lớn hơn Đến ngày"
        });
        return;
      }
      await this.getAllOrders({
          fromDate: fromMonth + "/" + fromDay + "/" + fromYear, 
          toDate: toMonth + "/" + toDay + "/" + toYear,
      });
      
    },
    orderDetailForm(order) {
      this.oneOrder = order;
      this.orderDetail = true;
    },
  },
  async created() {
    await this.getAllOrders({
    fromDate: '01/01/2021', toDate: '10/10/2030'}); 
  }
};
</script>

<style scoped>
.v-application p {
  margin-left: 0px;
}
.shop-management-wrapper {
  background-color: #ffffff;
  width: 940px;
  padding: 0px 20px;
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

.hr {
  margin-bottom: 5px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}

.header__top-search-block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__top-search-block label {
  width: 120px;
  font: 400 16px Roboto;
  color: #616161;
  padding: auto;
}

.header__top-search-block .v-text-field {
  max-width: 270px;
  margin-left: -20px;
  margin-right: 40px;
  font: 400 15px Roboto;
  color: #616161;
}

.header__top-search-block input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 36px;
  width: 520px;
  margin-left: 0;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.header__top-search-block input:focus {
  box-shadow: 0px 0px 8px #fea200;
}

.header__top-search-block .v-btn {
  height: 36px;
  color: #ffffff !important;
  margin-left: 8px;
  background-color: #fea200 !important;
  text-transform: none;
  font: 400 14px Roboto;
  letter-spacing: 0;
  box-shadow: none !important;
}

.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font: 400 15px Roboto;
  width: 900px;
}

.styled-table thead tr {
  background-color: #fea200;
  color: #ffffff;
  text-align: left;
}

.styled-table th {
  padding: 12px 15px;
}

.styled-table td {
  padding: 3px 15px;
}
.product-name-img {
  display: flex;
  align-items: center;
  gap: 10px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
  font: 400 14px Roboto;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #fea200;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #fea200;
}
</style>
