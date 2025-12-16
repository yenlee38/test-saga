import axios from 'axios';
import {showModal} from '../helps/overlay';
import {ERROR_OVERLAY} from '../navigator/screens';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const apiInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'},
});

apiInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = '';
    config.headers.Authorization = `${token ? 'Bearer ' : ''}${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 401) {
      return refreshToken().then(res => {
        setToken(res);
        const config = {
          ...response.config,
          headers: {
            ...response.config.headers,
            Authorization: `${res ? 'Bearer ' : ''}${res}`,
          },
        };
        return apiInstance(config);
      });
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

const setToken = token => {
  apiInstance.defaults.headers.common.Authorization = `${
    token ? 'Bearer ' : ''
  }${token}`;
};

export function getLocalToken() {
  return '';
}

export function refreshToken() {
  return APIClient.get({url: '/token', body: ''});
}

export default class APIClient {
  static get({url, params}) {
    return new Promise((resolve, reject) =>
      apiInstance
        .get(url, {
          params: {...params, appid: '200cc74608baac5e4f7055f02d40c918'},
        })
        .then(response => {
          console.log('response: ', response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        }),
    );
  }

  static post({url, body, headers}) {
    let config = {
      method: 'post',
      headers: {...DEFAULT_HEADERS, ...headers},
      data: JSON.stringify(body),
    };
    return new Promise((resolve, reject) =>
      apiInstance
        .post(url, config)
        .then(response => resolve(response))
        .catch(error => reject(error)),
    );
  }

  static postUrlencoded({url, body}) {
    let config = {
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(body),
    };

    return new Promise((resolve, reject) =>
      apiInstance
        .post(url, config)
        .then(response => resolve(response))
        .catch(error => reject(error)),
    );
  }

  static put({url, body}) {
    let config = {
      method: 'put',
      url,
      headers: {...DEFAULT_HEADERS},
      data: JSON.stringify(body),
    };
    return new Promise((resolve, reject) =>
      apiInstance
        .put(url, config)
        .then(response => resolve(response))
        .catch(error => reject(error)),
    );
  }
}
