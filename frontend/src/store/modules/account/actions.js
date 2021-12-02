import {login, signup} from '@/api/api_account';
import router from '@/router'
const actions = {
  'SIGNUP': async (context, signupInfo) => {
    try {
      await signup(signupInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Đăng ký tài khoản thành công'
      })
      router.push({name: 'login'});
    } catch (error) {
      console.log(error);
    }
  },

  'LOGIN': async (context, account) => {
    try {
      let res = await login(account);
      context.commit('SET_CURRENT_USER', res.data);
    } catch (error) {
      console.log(error);
      if(error.response.status === 401) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Đăng nhập thất bại! Vui lòng kiểm tra lại'
        });
      }
      if (error.response.status === 500) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: 'Lỗi hệ thống! Đăng nhập thất bại'
        });
        router.push({name: 'error500'}); 
      }
    }
  }
};

export default actions;