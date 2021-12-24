<template>
  <div class="wrapper">
    <div class="reset-pass-dialog">
      <h3>Đặt lại mật khẩu</h3>

      <div class="reset-pass-form" v-if="!showMessage">
        <ValidationProvider
          name="Email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <input type="text" placeholder="Nhập email của bạn" v-model="email" />
          <span class="error-text">{{ errors[0] }}</span>
        </ValidationProvider>
        <v-btn class="btn-reset-pass" @click="submit">Đặt lại</v-btn>
      </div>
      <div class="message" v-if="showMessage">
        <p>Mã xác minh đã gửi đến địa chỉ</p>
        <p>{{ this.email }}</p>
        <p>Vui lòng xác minh!</p>
        <v-btn class="btn-ok" @click="ok">OK</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vee-validate/dist/rules';
import { extend, ValidationProvider, setInteractionMode } from 'vee-validate';
import { mapMutations, mapActions } from 'vuex';
setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} không thể trống',
});

extend('email', (email) => {
  if (!email.match(/.+@.+\..+/)) {
    return 'Email không đúng định dạng';
  }
  return true;
});
export default {
  name: 'ResetPasswordForm',
  components: { ValidationProvider },
  data() {
    return {
      email: '',
      showMessage: false,
    };
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      requireResetPassword: 'REQUIRE_RESET_PASSWORD',
    }),
    async submit() {
      if (this.email.match(/.+@.+\..+/)) {
        await this.requireResetPassword({
          email: this.email,
        });
      }
    },
    ok() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #fea200;
  display: flex;
  justify-content: center;
}

.reset-pass-dialog {
  margin-top: 12%;
  background: #ffffff;
  width: 380px;
  height: 200px;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.reset-pass-dialog h3 {
  color: #616161;
  font: 700 22px Roboto;
}

.reset-pass-form input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 42px;
  width: 240px;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
  margin-top: 20px;
}

.reset-pass-form input:focus {
  box-shadow: 0px 0px 8px #fcb800;
}

.btn-ok,
.btn-reset-pass {
  background-color: #fea200 !important;
  color: #ffffff !important;
  letter-spacing: 0 !important;
  width: 240px;
  height: 40px;
}

.message {
  margin-top: 20px;
}

.message p {
  color: #616161;
  margin-bottom: 0;
  line-height: 20px;
}

.message p:nth-child(2) {
  color: #fea200;
  font-weight: bold;
}
.reset-pass-form .error-text {
  display: block;
  color: red;
  font: 400 13px Roboto;
  align-self: start;
  margin-left: 10px;
  height: 13px;
  text-align: left;
  margin-left: 60px;
  margin-bottom: 3px;
  margin-top: 3px;
}
</style>
