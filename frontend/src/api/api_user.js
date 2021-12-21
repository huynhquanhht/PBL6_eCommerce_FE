import {
  getRequest, 
  postRequest,
  patchRequest,
  putRequest,
} from '@/utils/utils-api';

const getUser = () => {
  return getRequest(`Users/me`);
}
const forgotPassword = (email) => {
  return postRequest(`Users/${email}/ForgetPassword`, email);
}

const confirmResetPass = (user) => {
  return getRequest(`Users/ConfirmResetPass?email=${user.email}&token=${user.token}`)
}

const changePasswordForgot = (passwordInfo) => {
  return patchRequest(`Users/ResetPassword`, passwordInfo)
}
const getAllUsers = (name) => {
  return getRequest(`Users?name=${name}`);
}

const getUserById = (userId) => 
{
  return getRequest(`Users/${userId}`);
}

const disableUser = (userId) => {
  return patchRequest(`Users/Disable?userId=${userId}`);
}

const enableUser = (userId) => {
  return patchRequest(`Users/Enable?userId=${userId}`);
}

const updateUser = (userId, userInfo) => {
  return putRequest(`Users?userId=${userId}`, userInfo);
}

const addNewUser = (userInfo) => {
  return postRequest(`Authen/register`, userInfo);
}

const updateMember = (memberInfo) => {
  return putRequest(`Users/me`, memberInfo);
}
export {
  getUser,
  forgotPassword,
  confirmResetPass,
  getAllUsers,
  getUserById,
  disableUser,
  enableUser,
  updateUser,
  addNewUser,
  updateMember,
  changePasswordForgot
}
