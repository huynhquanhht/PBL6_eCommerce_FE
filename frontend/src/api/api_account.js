import {getRequest, postRequest} from '@/utils/utils-api';

const login = (account) => {
  return postRequest('Authen/login', account);
}

const checkUsername = (username) => {
  return getRequest('Authen/CheckUsername', username);
}

const checkEmail = (email) => {
  return getRequest('Authen/CheckEmail', email);
}

const checkPhone = (phone) => {
  return getRequest('Authen/CheckPhone', phone);
}

const signup = (signupInfo) => {
  return postRequest('Authen/register', signupInfo);
}

export {
  login, signup, checkUsername, checkEmail, checkPhone
}
