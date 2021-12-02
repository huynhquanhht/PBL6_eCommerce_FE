<template>
  <div class="wrapper">
    <error
      :errorCode="errorCode"
      :errorTitle="errorTitle"
      :errorDetail="errorDetail"
    />
    <v-btn class="btn-go-back" @click="goHome">Go to home</v-btn>
  </div>
</template>

<script>
import Error from './Error.vue';
export default {
  name: 'Error404',
  components: {
    Error,
  },
  data: function() {
    return {
      errorCode: '404',
      errorTitle: 'Not Found',
      errorDetail:
        'The link you followed probably broken or the page has been removed',
    };
  },
  methods: {
    goHome() {
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
