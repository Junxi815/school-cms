import axiosInstance from "./axiosInstance";
import CryptoJS from "crypto-js";

const errHandler = (err) => {
  if (err.response) {
    const msg = err.response.data.msg || err.message;
    const code = err.response.status;
    return { msg, code };
  } else {
    return { msg: err.message };
  }
};

export const login = (role, email, password) => {
  password = CryptoJS.AES.encrypt(password, "cms").toString();
  return axiosInstance
    .post("/login", { role, email, password })
    .then((res) => res.data)
    .catch(errHandler);
};

export const logout = () => {
  return axiosInstance
    .post("/logout")
    .then((res) => res.data)
    .catch(errHandler);
};

export const getStudents = (params) => {
  return axiosInstance
    .get("/students", { params })
    .then((res) => res.data)
    .catch(errHandler);
};
