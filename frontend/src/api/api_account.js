import {getRequest, postRequest} from '@/utils/utils-api';

const login = (account) => {
  return postRequest('Authen/login', account);
}

const signup = (signupInfo) => {
  return postRequest('Authen/register', signupInfo);
}

const checkUsername = (username) => {
  console.log(username);
  return getRequest(`Authen/CheckUsername?username=${username}`);
}

const checkEmail = (email) => {
  return getRequest(`Authen/CheckEmail?email=${email}`);
}

const checkPhone = (phone) => {
  return getRequest(`Authen/CheckPhone?phone=${phone}`);
}

export {
  login, signup, checkUsername, checkEmail, checkPhone
}
