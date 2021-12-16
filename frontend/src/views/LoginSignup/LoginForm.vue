<template>
  <div class="form-block">
    <form width="500px">
      <p class="login-title">Đăng nhập</p>
      <input
        type="text"
        class="username-input"
        placeholder="Tên đăng nhập"
        v-model="username"
        @keyup.enter="submit"
      />
      <input
        type="password"
        class="password-input"
        placeholder="Mật khẩu"
        v-model="password"
        @keyup.enter="submit"
      />
      <span class="login-fail-message" v-show="showLoginFail"
        >Tên đăng nhập hoặc mật khẩu không đúng!</span
      >
      <v-btn
        class="btn-login white--text"
        @click="submit"
        height="42px"
        color="#fea200"
        depressed
        h1
      >
        <span style="font-size: 15px">Đăng nhập</span>
      </v-btn>
      <router-link to="/require-reset-password" class="signup-link">
        <span class="forgot-pass">
          Quên mật khẩu?
        </span>
      </router-link>
      <hr class="hr" />

      <div class="signup-sentence">
        <span>Bạn mới biết đến VERSACE? </span>
        <router-link to="/signup" class="signup-link">
          <span>
            Đăng ký
          </span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import localStorageUtils from '@/utils/utils-local-storage';
import router from '@/router'
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      showLoginFail: false,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'GET_CURRENT_USER',
    }),
  },
  methods: {
    ...mapActions({ 
      login: 'LOGIN'
    }),
    async submit() {
      await this.login({
        username: this.username,
        password: this.password,
      })
      if (this.currentUser != null) {
        localStorageUtils.getInstance().setToken(this.currentUser.resultObj);
        router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
}
.form-block {
  display: flex;
  align-items: center;
}
form {
  background-color: #ffffff !important;
  height: 330px;
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.v-text-field {
  width: 400px;
}
.forgot-pass {
  font: 500 15px Roboto;
  margin-right: 0px !important;
}
.forgot-pass a:hover {
  text-decoration: underline;
  margin-bottom: 25px !important;
}
.login-fail-message {
  font: 400 15px Roboto;
  color: red;
  align-self: start;
  margin-top: 10px;
  margin-left: 10px;
}
.btn-login {
  margin-bottom: 10px;
  margin-top: 10px;
  width: 320px;
}
.login-title {
  font: 500 27px Roboto;
  color: #555555;
}
.signup-sentence {
  margin-top: 10px;
}
.signup-sentence span {
  font: 500 15px Roboto;
  color: #555555;
  text-decoration: none;
}

.signup-sentence span a:hover {
  text-decoration: underline;
}

.signup-link {
  font: 500 16px Roboto;
  text-decoration: none;
}

.signup-link span {
  color: #1976d2;
}

.signup-link:hover {
  text-decoration: underline;
}

.username-input,
.password-input {
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

.username-input:focus,
.password-input:focus {
  box-shadow: 0px 0px 8px #fea200;
}

.username-input {
  margin-top: 20px;
}

.password-input {
  margin-top: 10px;
}

.hr {
  margin-top: 10px;
  width: 320px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}
</style>
