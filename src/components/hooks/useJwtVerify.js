import axios from "axios";

const useJwtVerify = axios.create({});

useJwtVerify.interceptors.request.use(
  function (config) {
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

useJwtVerify.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
    }
    return Promise.reject(error);
  }
);

export default useJwtVerify;
