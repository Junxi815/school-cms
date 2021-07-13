import axios from "axios";
import { getUser } from "../utils/userInfo";

const baseURL = "https://cms.chtoma.com/api";

// const exception = ["login", "degrees", "countries"];
// const checkUrl = (config) => {
//   exception.forEach((item) => {
//     if (config.url.includes(item)) {
//       return false;
//     }
//   });
// };

const axiosInstance = axios.create({
  baseURL,
  headers: {
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.url.includes("login")) {
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

// export default function ajax(url, data = {}, type = "GET") {
//   const axiosInstance = axios.create({
//     baseURL,
//     withCredentials: true,
//   });
//   if (!!getUser().token) {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
//       getUser().token
//     }`;
//   }
//   // const token = userInfo.getUser.token;
//   // if (token) {
//   //   axios.defaults.headers.common = {
//   //     Authorization: `Bearer ${userInfo.getUser().token}`,
//   //   };
//   // }
//   let promise;
//   if (type === "GET") {
//     promise = axiosInstance.get(url, {
//       params: data,
//     });
//   } else {
//     promise = axiosInstance.post(url, data);
//   }
//   return promise;
// }
