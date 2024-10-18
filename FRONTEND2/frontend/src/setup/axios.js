import axios from "axios";
import { toast } from "react-toastify"
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:8080'
  // baseURL: process.env.process.REACT_APP_BACKEND_URL
});

instance.defaults.withCredentials = true

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // eslint-disable-next-line no-mixed-operators
  const status = error && error.response && error.response.status || 500;

  switch (status) {
    // authentication (token related issues)
    case 401: {
      toast.error('Unauthorized the user .Please login...')
      // window.location.href = '/login'
      // return Promise.reject(error);
      return error.response.data;
    }

    // forbidden (permission related issues)
    case 403: {
      toast.error(`You don't permission to access this resource...`);
      // return Promise.reject(error);
      return;
    }

    // bad request
    case 400: {
      return error.response.data;
    }

    // not found
    case 404: {
      return Promise.reject(error);
    }

    // conflict
    case 409: {
      return Promise.reject(error);
    }

    // unprocessable
    case 422: {
      return Promise.reject(error);
    }

    // generic api error (server related) unexpected
    default: {
      return Promise.reject(error);
    }
  }

});

export default instance;