import axios from 'axios';
import localStorageUtils from './utils-local-storage';
const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    const userToken = localStorageUtils.getInstance().getToken();
    if (userToken) {
      config.headers['Authorization'] = 'Bearer ' + userToken;
    }
    config.headers['Content-type'] = 'application/json/multipart/form-data';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

const getRequest = url => {
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
