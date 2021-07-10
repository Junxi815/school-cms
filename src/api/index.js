import ajax from "./ajax";
import CryptoJS from "crypto-js";
const baseURL = "https://cms.chtoma.com/api";

export const reqLogin = (role, email, password) => {
  password = CryptoJS.AES.encrypt(password, "cms").toString();
  return ajax(baseURL + "/login", { role, email, password }, "POST");
};

export const reqLogout = () => ajax(baseURL + "/logout", {}, "POST");

export const getStudents = () => ajax(baseURL + "/students");
