import axios from "axios";
import { getUser } from "../../services/userInfo";

const baseURL = "https://cms.chtoma.com/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    withCredentials: true,
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url.search(/login|degrees|countries/) === -1) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + getUser()?.token,
      },
    };
  }
  return config;
});

export default axiosInstance;
