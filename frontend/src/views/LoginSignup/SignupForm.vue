<template>
  <div class="form-block">
    <form width="500px">
      <p class="signup-title">Đăng ký</p>
      <ValidationProvider name="Họ tên" rules="required" v-slot="{ errors }">
        <input
          type="text"
          class="input name-input"
          placeholder="Họ tên"
          v-model="fullname"
        />
        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider
        name="Email"
        rules="required|email|isExistedEmail"
        v-slot="{ errors }"
      >
        <input
          type="text"
          class="input email-input"
          placeholder="Email"
          v-model="email"
          @change="checkEmail"
        />
        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider
        name="Số điện thoại"
        rules="required|phone|isExistedPhone"
        v-slot="{ errors }"
      >
        <input
          type="text"
          class="input phone-input"
          placeholder="Số điện thoại"
          v-model="phoneNumber"
          @change="checkPhone"
        />
        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider
        name="Tên đăng nhập"
        rules="required|isExistedUsername"
        v-slot="{ errors }"
      >
        <input
          type="text"
          class="input username-input"
          placeholder="Tên đăng nhập"
          v-model="username"
          @change="checkUsername"
        />
        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
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
          placeholder="Mật khẩu"
          v-model="password"
        />
        <span class="error-text">{{ errors[0] }}</span>
        <span></span>
      </ValidationProvider>
      <ValidationProvider
        name="Mật khẩu xác nhận"
        rules="required|confirmed:@password"
        v-slot="{ errors }"
      >
        <input
          name="confirmPassword"
          type="password"
          class="input password-input"
          placeholder="Mật khẩu xác nhận"
          v-model="confirmPassword"
        />
        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <v-btn
        class="btn-signup white--text mt-4 mb-4"
        @click="submit"
        width="100%"
        height="42px"
        color="#fea200"
        depressed
      >
        <span class="font-size: 15px">Đăng ký</span>
      </v-btn>
      <hr class="hr" />
      <div class="login-sentence">
        <span class="question">Bạn đã có tài khoản VERSACE? </span>
        <router-link class="login-link" to="/login" tag="a">
          <span> Đăng nhập </span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vee-validate/dist/rules';
import { extend, ValidationProvider, setInteractionMode } from 'vee-validate';
import { mapGetters, mapMutations, mapActions } from 'vuex';
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

extend('phone', (phone) => {
  if (!phone.match(/^[0-9]{10,10}$/)) {
    return 'Số điện thoại phải đủ 10 chữ số';
  }
  return true;
});

extend('password', (password) => {
  if (!password.match(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
    return 'Mật khẩu chứa ít nhất 8 ký tự, 1 chữ cái, 1 chữ số';
  }
  return true;
});

extend('confirmed', (confirmPassword, [password]) => {
  if (confirmPassword != password) {
    return 'Mật khẩu xác nhận không trùng khớp';
  }
  return true;
});

export default {
  name: 'SignupForm',
  components: {
    ValidationProvider,
  },
  data() {
    return {
      fullname: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
      valid: '',
      show: false,
    };
  },
  computed: {
    ...mapGetters({
      isExistedUsername: 'GET_CHECK_USERNAME',
      isExistedEmail: 'GET_CHECK_EMAIL',
      isExistedPhone: 'GET_CHECK_PHONE',
    }),
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    ...mapActions({
      signup: 'SIGNUP',
      checkExistedUsername: 'CHECK_USERNAME',
      checkExistedEmail: 'CHECK_EMAIL',
      checkExistedPhone: 'CHECK_PHONE',
    }),
    async checkUsername() {
      await this.checkExistedUsername(this.username);
    },
    async checkPhone() {
      await this.checkExistedPhone(this.phoneNumber);
    },
    async checkEmail() {
      await this.checkExistedEmail(this.email);
    },
    submit() {
      if (
        this.fullname !== '' &&
        this.email.match(/.+@.+\..+/) &&
        this.phoneNumber.match(/^[0-9]{10,10}$/) &&
        this.username !== '' &&
        this.password.match(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) &&
        this.password === this.confirmPassword &&
        !this.isExistedUsername &&
        !this.isExistedEmail &&
        !this.isExistedPhone
      ) {
        this.signup({
          fullname: this.fullname,
          email: this.email,
          phoneNumber: this.phoneNumber,
          username: this.username,
          password: this.password,
        });
      } else {
        this.setSnackbar({
          type: 'warning',
          visible: true,
          text: 'Không thể đăng ký! Vui lòng kiểm tra lại thông tin!',
        });
      }
    },
  },
  mounted() {
    extend('isExistedUsername', async (username) => {
      await this.checkExistedUsername(username);
      if (this.isExistedUsername) {
        return 'Tên đăng nhập đã tồn tại';
      }
      return '';
    });
    extend('isExistedEmail', async (email) => {
      await this.checkExistedEmail(email);
      if (this.isExistedEmail) {
        return 'Email đã tồn tại';
      }
      return '';
    });
    extend('isExistedPhone', async (phone) => {
      await this.checkExistedPhone(phone);
      if (this.isExistedPhone) {
        return 'Số điện thoại đã tồn tại';
      }
      return '';
    });
  },
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
  font: 500 27px Roboto;
  color: #616161;
}

.question {
  font: 500 15px Roboto;
  color: #555555;
}

.btn-signup {
  letter-spacing: 0;
  margin: 0px !important;
}

.login-link {
  font: 500 15px Roboto;
  text-decoration: none;
  color: #1976d2;
  margin-top: 0px;
}

.login-link:hover {
  text-decoration: underline;
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

.input:focus {
  box-shadow: 0px 0px 8px #fcb800;
}

.error-text {
  display: block;
  color: red;
  font: 400 13px Roboto;
  align-self: start;
  margin-left: 10px;
  height: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
}

.hr {
  margin-top: 10px;
  margin-bottom: 5px;
  width: 320px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}
</style>
