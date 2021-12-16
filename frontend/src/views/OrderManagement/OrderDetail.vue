<template>
  <div class="order-detail-wrapper">
    <div class="order-detail-title">
      <p class="main-title">Chi tiết đơn hàng</p>
    </div>
    <hr class="order-detail-hr" />
    <order :order="order"></order>
  </div>
</template>

<script>
import Order from './Order.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Order },
  props: {
    id: {type: Number}
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      fetchOrderById: 'FETCH_ORDER_BY_ID'
    })
  },
  computed: {
   ...mapGetters({
     order: 'GET_ORDER'
   })
  },
  async created() {
    await this.fetchOrderById({id: this.id});
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
  margin-top: 5px;
}
.order-detail-wrapper {
  padding: 10px 20px 10px 20px;
}

.main-title {
  text-transform: uppercase;
  font: 600 16px Roboto;
  color: #616161;
}

.order-detail-hr {
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

</style>
