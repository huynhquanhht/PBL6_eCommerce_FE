<template>
  <div class="wrapper">
    <p class="error-code">{{ errorCode }}</p>
    <p class="error-title">{{ errorTitle }}</p>
    <div class="error-detail">
      <p class="error-detail-text">{{ errorDetail }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    errorCode: {
      type: String,
      default: 'Error code',
    },
    errorTitle: {
      type: String,
      default: 'Error title',
    },
    errorDetail: {
      type: String,
      default:
        'Error detail',
    },
  },
  methods: {
    goHome() {
      this.$router.push({name: 'home'});
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12%;
}
.error-code {
  font: 700 100px Roboto;
  color: #616161;
  box-shadow: #616161;
}

.error-title {
  font: 500 30px Roboto;
  color: #616161;
}

.error-detail {
  width: 380px;
  text-align: center;
  margin-top: 15px;
}

.error-detail-text {
  font: 400 20px Roboto;
  color: #616161;
}

.btn-go-back {
  margin-top: 20px;
  background-color: #fea200 !important;
  height: 50px !important;
  width: 180px;
  color: #ffffff !important;
  font: 500 16px Roboto !important;
  letter-spacing: 0;
}
</style>
