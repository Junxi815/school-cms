import axiosInstance from "./axiosInstance";
import CryptoJS from "crypto-js";

const errHandler = (err) => {
  if (err.response) {
    const msg = err.response.data.msg;
    const code = err.response.status;
    return { msg, code };
  } else {
    return { msg: err.message };
  }
};

export const reqLogin = (role, email, password) => {
  password = CryptoJS.AES.encrypt(password, "cms").toString();
  return axiosInstance
    .post("/login", { role, email, password })
    .then((res) => res.data)
    .catch(errHandler);
  // return axiosInstance("/login", { role, email, password }, "POST");
};

export const reqLogout = () => {
  return axiosInstance
    .post("/logout")
    .then((res) => res.data)
    .catch(errHandler);
};

// export const reqLogout = () => ajax("/logout", {}, "POST");

export const getStudents = (pagination) => {
  const path = `/students/?limit=${pagination.limit}&page=${pagination.page}`;
  return axiosInstance
    .get(path)
    .then((res) => res.data)
    .catch(errHandler);
};
// export const getStudents = (pagination) => ajax("/students", pagination);
// const path = `/students/${Object.entries(pagination)
//   .map(([key, value]) => `${key}=${value}`)
//   .join("&")}`;
