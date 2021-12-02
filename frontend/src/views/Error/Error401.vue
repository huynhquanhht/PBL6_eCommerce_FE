<template>
  <div class="wrapper">
    <error
      :errorCode="errorCode"
      :errorTitle="errorTitle"
      :errorDetail="errorDetail"
    />
    <v-btn class="btn-go-back" @click="goLogin">Go to login</v-btn>
  </div>

</template>

<script>
import Error from './Error.vue';
export default {
  name: 'Error401',
  components: {
    Error,
  },
  data: function() {
    return {
      errorCode: '401',
      errorTitle: '401 - Unauthorized',
      errorDetail:
        'Sorry, your request could not be processed',
    };
  },
  methods: {
    goLogin() {
      this.$router.push({name: 'login'});
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
