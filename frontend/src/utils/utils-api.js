import axios from 'axios';
import localStorageUtils from './utils-local-storage';
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const userToken = localStorageUtils.getInstance().getToken();
    if (userToken) {
      config.headers['Authorization'] = 'Bearer ' + userToken;
    }
    config.headers['Content-type'] = 'application/json/multipart/form-data';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  function (error) {
    if (error.response.status === 400) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      router.push({ name: 'error401' });
      return;
    } else if (error.response.status === 403) {
      router.push({ name: 'error403' });
      return;
    } else if (error.response.status === 404) {
      router.push({ name: 'error404' });
      return;
    } else if (error.response.status === 500) {
      router.push({ name: 'error500' });
      return;
    } else {
      router.push({ name: 'other-page' });
      return;
    }
  }
);

const getRequest = (url) => {
  console.log(url);
  return service.request({
    method: 'get',
    url: url,
    responseType: 'json',
  });
};

const putRequest = (url, data = {}) => {
  return service.request({
    method: 'put',
    url: url,
    responseType: 'json',
    data: data,
  });
};

const postRequest = (url, data = {}) => {
  return service.request({
    method: 'post',
    url: url,
    responseType: 'json',
    data: data,
  });
};

const patchRequest = (url, data = {}) => {
  return service.request({
    method: 'patch',
    url: url,
    responseType: 'json',
    data: data,
  });
};

const deleteRequest = (url, data = {}) => {
  return service.request({
    method: 'delete',
    url: url,
    responseType: 'json',
    data: data,
  });
};

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
