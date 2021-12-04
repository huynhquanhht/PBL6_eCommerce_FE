import { getUser, forgotPassword, confirmResetPass } from '@/api/api_user';
import router from '@/router'
const actions = {
  'FETCH_USER_INFO': async (context) => {
    try {
      let res = await getUser();
      context.commit('SET_USER_INFO', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 401) {
        router.push({name: 'error401'}); 
        return;
      }
      if (error.response.status === 500) {
        router.push({name: 'error500'}); 
        return;
      }
      router.push({name: 'other-error'}); 
    }
  },
  'REQUIRE_RESET_PASSWORD': async (context, user) => {
    try {
      await forgotPassword(user.email);
    } catch (error) {
      if (error.response.status === 500) {
        router.push({name: 'error500'}); 
        return;
      }
      router.push({name: 'other-error'}); 
    }
  },
  'RESET_PASSWORD': async (context, user) => {
    try {
      await confirmResetPass(user);
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;