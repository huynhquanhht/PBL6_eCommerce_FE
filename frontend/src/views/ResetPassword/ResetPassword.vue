<template>
  <div class="wrapper">
    <div class="set-pass-dialog" v-if="isTrueToken">
      <h3>Đặt mật khẩu mới</h3>
      <div class="set-pass-form" >
        <ValidationProvider
          name="Mật khẩu"
          rules="required|password"
          v-slot="{ errors }"
          vid="password"
        >
          <input
            name="password"
            type="password"
            class="input password-input"
            placeholder="Nhập mật khẩu mới"
            v-model="password"
            ref="password"
            vid="password"
          />
          <span class="error-text">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Mật khẩu xác nhận"
          rules="required|confirmed:@password"
          v-slot="{ errors }"
        >
          <input
            name="confirmPassword"
            type="password"
            class="input confirm-password-input"
            placeholder="Nhập mật khẩu xác nhận"
            v-model="confirmPassword"
          />
          <span class="error-text">{{ errors[0] }}</span>
        </ValidationProvider>
        <v-btn class="btn-set-pass" @click="submit">Xác nhận</v-btn>
      </div>
    </div>
    <div class="token-fail" v-if="!isTrueToken">
      <span>Token không đúng! Vui lòng kiểm tra lại</span>
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

extend('password', (password) => {
  if (!password.match(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
    return 'Mật khẩu chứa ít nhất 8 ký tự, 1 chữ cái, 1 chữ số';
  }
  return '';
});

extend('confirmed', (confirmPassword, [password]) => {
  if (confirmPassword != password) {
    return 'Mật khẩu xác nhận không trùng khớp';
  }
  return '';
});

export default {
  name: 'SignupForm',
  components: {
    ValidationProvider,
  },
  props: {
    email: { type: String },
    token: { type: String },
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      isTrueToken: null,
    };
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      confirmResetPassword: 'CONFIRM_RESET_PASSWORD',
      changePassword: 'CHANGE_PASSWORD_FORGOT',
    }),
    submit() {
      if (
        this.password.match(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) &&
        this.password === this.confirmPassword
      ) {
        this.changePassword({
          email: this.email,
          newPass: this.password,
          token: this.token,
        });
      } else {
        this.setSnackbar({
          type: 'warning',
          text: 'Thông tin nhập không hợp lệ. Vui lòng kiểm tra lại',
          visible: true,
        });
      }
    },
  },
  async created() {
    console.log('email - ', this.email);
    console.log('token - ', this.token);
    let res = await this.confirmResetPassword({
      email: this.email,
      token: this.token,
    });
    if (res) {
      this.isTrueToken = true;
    } else {
      this.isTrueToken = false;
    }
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

.set-pass-dialog {
  margin-top: 10%;
  background: #ffffff;
  width: 380px;
  height: 240px;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.set-pass-dialog h3 {
  color: #616161;
  font: 500 22px Roboto;
}

.set-pass-form {
  text-align: center;
}

.btn-set-pass {
  background-color: #fea200 !important;
  color: #ffffff !important;
  letter-spacing: 0 !important;
  font: 500 16px Roboto !important;
  text-transform: none;
  width: 240px;
  height: 40px;
}

.password-input {
  margin-top: 10px;
}

.input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 42px;
  width: 240px;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.input:focus {
  box-shadow: 0px 0px 8px #fea200;
}

.error-text {
  display: block;
  color: red;
  font: 400 13px Roboto;
  align-self: start;
  height: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
  text-align: left;
  margin-left: 50px;
}
.token-fail {
  width: 360px;
  height: 120px;
  background-color: #ffffff;
  padding: 20px 40px;
  border-radius: 4px;
  font: 400 16px Roboto;
  color: #616161;
  line-height: 70px;
  margin-top: 96px;
}
</style>
