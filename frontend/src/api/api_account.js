import {postRequest} from '@/utils/utils-api';

const login = (account) => {
  return postRequest('Authen/login', account);
}

const signup = (signupInfo) => {
  return postRequest('Authen/register', signupInfo);
}

export {
  login, signup
}
