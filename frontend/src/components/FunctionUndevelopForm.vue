<template>
  <div class="form-block">
    <form width="500px">
      <v-icon color="#fea200" size="150px">fa-cogs</v-icon>
      <p class="signup-title">
        Chức năng {{ funcTitle }} hiện tại chưa được phát triển
      </p>
    </form>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    funcTitle: String,
  },
  data() {
    return {
      delete: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.v-app-bar {
  position: relative !important;
}
.form-block {
  display: flex;
  align-items: center;
}
form {
  background-color: #ffffff;
  width: 400px;
  padding: 25px 40px 25px 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup-title {
  font: 500 24px Roboto;
  color: #616161;
  justify-content: center;
  align-items: center;
}

.input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 42px;
  width: 320px;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.btn {
  display: flex;
  margin-right: 20px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
