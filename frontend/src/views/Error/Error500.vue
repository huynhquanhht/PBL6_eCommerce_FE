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
  name: 'Error500',
  components: {
    Error,
  },
  data: function() {
    return {
      errorCode: '500',
      errorTitle: 'Internal Server Error',
      errorDetail:
        'The server has been deserted for a while. Please be patient or try again later',
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
}</style>
