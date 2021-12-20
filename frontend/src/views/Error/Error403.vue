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
  name: 'Error403',
  data: function() {
    return {
      errorCode: '403',
      errorTitle: 'Forbidden',
      errorDetail:
        'You don\'t have permission to access this resource.',
    };
  },
  components: {
    Error,
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
