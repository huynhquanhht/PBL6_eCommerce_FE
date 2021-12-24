<template>
  <div class="all-order-wrapper">
    <div class="all-order-title">
      <p class="main-title">Tất cả hóa đơn</p>
    </div>
    <hr class="all-order-hr" />
    <table class="styled-table" v-if="orders">
      <thead>
        <tr>
          <th style="width: 50px">Stt</th>
          <th style="width: 100px">Mã đơn</th>
          <th style="width: 260px">Tên người mua</th>
          <th style="width: 80px">Điện thoại</th>
          <th style="width: 140px">Tổng hóa đơn</th>
          <th style="width: 140px">Trạng thái</th>
          <th style="width: 130px">Ngày cập nhật</th>
          <th style="width: 130px">Lý do hủy đơn</th>
          <th style="width: 140px">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.shipName }}</td>
          <td>{{ order.shipPhone }}</td>
          <td>{{ order.totalPrice.toLocaleString('it-IT') }}</td>
          <td>{{ order.state }}</td>
          <td>
            {{ new Date().toLocaleDateString('en-GB', order.dateModified) }}
          </td>
          <td v-if="order.state === 'Đã hủy'">{{ order.cancelReason }}</td>
          <td v-else></td>
          <td class="btn-block">
            <v-btn
              icon
              width="26px"
              height="26px"
              @click="viewDetail(order.id)"
            >
              <v-icon size="25px">mdi-information</v-icon>
            </v-btn>
            <v-btn
              icon
              width="26px"
              height="26px"
              v-if="order.state === 'Chờ xác nhận'"
              @click="confirmOrder(order.id)"
            >
              <v-icon size="25px">mdi-check-circle</v-icon>
            </v-btn>
            <v-btn
              icon
              width="26px"
              height="26px"
              v-if="
                order.state === 'Chờ xác nhận' || order.state === 'Đã xác nhận'
              "
              @click="cancelOrder(order.id)"
            >
              <v-icon size="25px">mdi-close-circle</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <v-dialog v-model="dialog" width="400px">
      <reason-dialog
        @agree-reason-dialog="agreeReasonOrder"
        @cancel-reason-dialog="cancelReasonOrder"
      ></reason-dialog>
    </v-dialog>
    <v-dialog v-model="confirmDialog" width="400px">
      <confirm-dialog
        :question="question"
        @agree-confirm-dialog="agreeConfirmDialog"
        @cancel-confirm-dialog="cancelConfirmDialog"
      ></confirm-dialog>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ReasonDialog from '@/components/ReasonDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue'
export default {
  components: { ReasonDialog, ConfirmDialog},
  data() {
    return {
      dialog: false,
      confirmDialog: false,
      orderId: null,
      searchId: '',
      searchOrders: null,
      question: '',
    };
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      fetchShopOrders: 'FETCH_SHOP_ORDERS',
      cancelShopOrder: 'CANCEL_SHOP_ORDER',
      fetchOrderById: 'FETCH_ORDER_BY_ID',
      fetchConfirmOrder: 'CONFIRM_ORDER'
    }),
    async search() {
      await this.fetchOrderById({ id: parseInt(this.searchId) });
      if (this.orderInfo) {
        if (this.orderInfo.shopId == this.orders[0].shopId) {
          this.$router.push(`/shop-chanel/order-detail/${this.orderInfo.id}`);
        } else {
          this.setSnackbar({
            type: 'info',
            visible: true,
            text: 'Không tìm thấy đơn hàng phù hợp',
          });
          return;
        }
      } else {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: 'Không tìm thấy đơn hàng phù hợp',
        });
        return;
      }
      return;
    },
    async getShopOrder(state) {
      await this.fetchShopOrders(state);
    },
    async agreeReasonOrder(reason) {
      if (reason === '') {
        this.setSnackbar({
          type: 'warning',
          text: 'Vui lòng nhập lý do hủy đơn',
          visible: true,
        });
        return;
      }
      let cancelResult = await this.cancelShopOrder({
        orderId: this.orderId,
        cancelReason: reason,
      });
      if (cancelResult) {
        await this.fetchShopOrders('Tất cả');
      }
      this.dialog = false;
    },
    cancelReasonOrder() {
      this.dialog = false;
    },
    confirmOrder(orderId) {
      this.orderId = orderId;
      this.question = 'Bạn chắc chắn muốn xác nhận đơn hàng?'
      this.confirmDialog = true;
    },
    async agreeConfirmDialog() {
      await this.fetchConfirmOrder({id: this.orderId})
      this.confirmDialog = false;
    },
    cancelConfirmDialog() {
      this.confirmDialog = false;
    },
    cancelOrder(orderId) {
      this.dialog = true;
      this.orderId = orderId;
    },
    viewDetail(orderId) {
      this.$router.push(`/shop-chanel/order-detail/${orderId}`);
    },
  },
  computed: {
    ...mapGetters({
      orders: 'GET_ORDERS',
      orderInfo: 'GET_ORDER',
    }),
  },
  async created() {
    await this.fetchShopOrders('Tất cả');
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
  margin-top: 5px;
}
.all-order-wrapper {
  padding: 10px 20px 10px 20px;
}

.main-title {
  text-transform: uppercase;
  font: 600 16px Roboto;
  color: #616161;
}

.all-order-hr {
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
  color: #616161;
  margin: 5px 0px;
}

.search-block {
  display: grid;
  grid-template-columns: 120px 180px 280px 100px;
  align-items: center;
  column-gap: 10px;
}

.search-label {
}

.search-select {
  background-color: #ffffff !important;
  border-style: solid !important;
  -webkit-appearance: auto !important;
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 30px;
  width: 100%;
  outline: #616161;
  font: 400 15px Roboto;
  border-radius: 4px;
  cursor: pointer;
}

.search-select:focus {
  box-shadow: 0px 0px 4px #616161;
}

.search-input {
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 30px;
  width: 100%;
  outline: none;
  padding: 8px;
  font: 400 15px Roboto;
  border-radius: 4px;
}

.search-input:focus {
  box-shadow: 0px 0px 4px #616161;
}

.search-button {
  height: 32px !important;
  background-color: #fea200 !important;
  letter-spacing: 0px !important;
  text-transform: none !important;
  color: #ffffff !important;
  font: 400 14px Roboto;
  box-shadow: none !important;
}

.styled-table {
  border-collapse: collapse;
  margin: 5px 0;
  font: 400 15px Roboto;
}

.styled-table thead tr {
  background-color: #fea200;
  color: #ffffff;
  text-align: center;
  border: solid 1px #616161;
}

.styled-table th,
.styled-table td {
  padding: 6px 15px;
  border: solid 1px #616161;
  text-align: center;
}

.btn-block {
  text-align: left !important;
  padding-left: 24px !important;
}
</style>
