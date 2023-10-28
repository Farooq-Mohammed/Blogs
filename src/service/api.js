import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import { getTypes } from "../utils/common-utils";

const API_URL = `http://localhost:8080`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json, form-data",
    "Content-Type": "application/json"
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if(config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if(config?.TYPE?.query) {
      config.url = config.url + "/" + config.TYPE.query; 
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader here
    return processResponse(response);
  },
  function (error) {
    // stop global loader here
    return Promise.reject(processError(error));
  }
);

//////////////////////////////////
// If success => return { isSuccess: true, data: Object }
// If fail => return { isFailure: true, msg: string, status: string, code: int }
//////////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200 || response?.status === 201) {
    return {
      isSuccess: true,
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    // Request made and server responded with other than 2.x.x
    // console.log("Error in response", error);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
      responseMsg: error.response.data.msg
    };
  } else if (error.request) {
    // No response from server
    // console.log("Error in request", error);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
      responseMsg: error.request
    };
  } else {
    // Something happened in setting up connectivity
    // console.log("Error in network", error);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
      responseMsg: "Connection error"
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProcess) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === 'DELETE' ? {} : body,
      TYPE: getTypes(value, body),
      headers: value.headers,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProcess) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProcess(percentageCompleted);
        }
      },
    });
}

export { API };
