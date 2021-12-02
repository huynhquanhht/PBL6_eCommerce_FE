import {getRequest} from '@/utils/utils-api';

const getUser = () => {
  return getRequest(`Users/me`);
}
const getUserByEmail = (email) => {
  return getRequest(`Users/${email}/forgetPassword`, email);
}

const confirmResetPass = (user) => {
  return getRequest( `Users/ConfirmResetPass?email=${user.email}&key=${user.key}`)
}

export {
  getUser,
  getUserByEmail,
  confirmResetPass
}
