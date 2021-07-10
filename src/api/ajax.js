import axios from "axios";
import { userInfo } from "../utils/storage";
// const baseURL = "https://cms.chtoma.com/api";

export default function ajax(url, data = {}, type = "GET") {
  // const axiosInstance = axios.create({
  //   baseURL,
  //   withCredentials: true,
  //   responseType: "json",
  // });
  // if (!!userInfo.getUser().token) {
  //   axiosInstance.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer $(userInfo.getUser().token)`;
  // }
  const token = userInfo.getUser.token;
  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer $(userInfo.getUser().token)`,
    };
  }
  let promise;
  if (type === "GET") {
    promise = axios.get(url, {
      params: data,
    });
  } else {
    promise = axios.post(url, data);
  }
  return promise;
}
