import {
  login,
  signup,
  checkUsername,
  checkPhone,
  checkEmail,
} from '@/api/api_account';
import router from '@/router';
const actions = {
  SIGNUP: async (context, signupInfo) => {
    try {
      await signup(signupInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Đăng ký tài khoản thành công',
      });
      router.push({ name: 'login' });
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data.message,
        });
      }
    }
  },

  CHECK_USERNAME: async (context, username) => {
    try {
      let res = await checkUsername(username);
      context.commit('SET_CHECK_USERNAME', res.data.isExisted);
    } catch (error) {
      context.commit('SET_SNACKBAR', {
        type: 'error',
        visible: true,
        text: error.response.data.message,
      });
    }
  },

  CHECK_EMAIL: async (context, email) => {
    try {
      let res = await checkEmail(email);
      context.commit('SET_CHECK_EMAIL', res.data.isExisted);
    } catch (error) {
      context.commit('SET_SNACKBAR', {
        type: 'error',
        visible: true,
        text: error.response.data.message,
      });
    }
  },

  CHECK_PHONE: async (context, phone) => {
    try {
      let res = await checkPhone(phone);
      console.log(res);
      context.commit('SET_CHECK_PHONE', res.data.isExisted);
    } catch (error) {
      context.commit('SET_SNACKBAR', {
        type: 'error',
        visible: true,
        text: error.response.data.message,
      });
    }
  },

  LOGIN: async (context, account) => {
    try {
      let res = await login(account);
      context.commit('SET_CURRENT_USER', res.data);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
      }
    }
  },
};

export default actions;
