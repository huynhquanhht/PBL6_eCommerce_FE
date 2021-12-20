import {
  getUser,
  forgotPassword,
  confirmResetPass,
  changePasswordForgot,
  getAllUsers,
  getUserById,
  disableUser,
  enableUser,
  updateUser,
  addNewUser,
  updateMember,
} from '@/api/api_user';
import router from '@/router';
const actions = {
  FETCH_USER_INFO: async (context) => {
    try {
      let res = await getUser();
      context.commit('SET_USER_INFO', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 401) {
        router.push({ name: 'error401' });
        return;
      }
      if (error.response.status === 500) {
        router.push({ name: 'error500' });
        return;
      }
      router.push({ name: 'other-error' });
    }
  },
  REQUIRE_RESET_PASSWORD: async (context, user) => {
    try {
      await forgotPassword(user.email);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Gửi yêu cầu đổi mật khẩu thành công!',
      });
      router.push({ name: 'login' });
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  CONFIRM_RESET_PASSWORD: async (context, user) => {
    try {
      await confirmResetPass(user);
      return true;
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return false;
      }
    }
  },
  CHANGE_PASSWORD_FORGOT: async (context, passwordInfo) => {
    try {
      await changePasswordForgot(passwordInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Đổi mật khẩu thành công',
      });
      router.push({ name: 'login' });
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
  ACT_GET_ALL_USERS: async (context, payload) => {
    try {
      const res = await getAllUsers(payload.name);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Hiện không có dữ liệu để hiển thị',
        });
      }
      context.commit('SET_ALL_USERS', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  ACT_GET_EACH_USER: async (context, userId) => {
    try {
      //console.log(userId);
      const res = await getUserById(userId);
      if (res.status === 204) {
        context.commit('SET_SNACKBAR', {
          type: 'info',
          visible: true,
          text: 'Hiện không có dữ liệu để hiển thị',
        });
      }
      context.commit('SET_EACH_USER', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  ACT_DISABLE_USER: async (context, payload) => {
    try {
      console.log('User Disable', payload.userId);
      await disableUser(payload.userId);
      const res = await getUserById(payload.userId);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Người dùng này đã bị vô hiệu hóa thành công',
      });
      context.commit('SET_EACH_USER', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  ACT_ENABLE_USER: async (context, payload) => {
    try {
      console.log('User Enable', payload.userId);
      await enableUser(payload.userId);
      const res = await getUserById(payload.userId);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Người dùng này đã được Ân xá thành công',
      });
      context.commit('SET_EACH_USER', res.data.resultObj);
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  ACT_UPDATE_USER: async (context, payload) => {
    try {
      await updateUser(payload.userId, payload.userInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Cập nhật thông tin người dùng thành công',
      });
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  ACT_ADD_NEW_USER: async (context, userInfo) => {
    try {
      await addNewUser(userInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Thêm tài khoản thành công',
      });
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
  ACT_UPDATE_MEMBER_INFO: async (context, payload) => {
    try {
      await updateMember(payload.memberInfo);
      context.commit('SET_SNACKBAR', {
        type: 'success',
        visible: true,
        text: 'Cập nhật thông tin cá nhân thành công',
      });
    } catch (error) {
      if (error.response.status === 400) {
        context.commit('SET_SNACKBAR', {
          type: 'error',
          visible: true,
          text: error.response.data,
        });
        return;
      }
    }
  },
};

export default actions;
