import {getRequest, postRequest} from '@/utils/utils-api';

const getUser = () => {
  return getRequest(`Users/me`);
}
const forgotPassword = (email) => {
  return postRequest(`Users/${email}/ForgetPassword`, email);
}

const confirmResetPass = (user) => {
  return postRequest( `Users/ConfirmResetPass?email=${user.email}&key=${user.key}`)
}

export {
  getUser,
  forgotPassword,
  confirmResetPass
}
