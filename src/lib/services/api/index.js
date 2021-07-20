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

export const addStudent = (params) => {
  return axiosInstance
    .post("/students", params)
    .then((res) => res.data)
    .catch(errHandler);
};

export const updateStudent = (params) => {
  return axiosInstance
    .put("/students", params)
    .then((res) => res.data)
    .catch(errHandler);
};

export const deleteStudent = (id) => {
  return axiosInstance
    .delete(`/students/${id}`)
    .then((res) => res.data)
    .catch(errHandler);
};

export const getStudentById = (id) => {
  return axiosInstance
    .get(`/students/${id}`)
    .then((res) => res.data)
    .catch(errHandler);
};