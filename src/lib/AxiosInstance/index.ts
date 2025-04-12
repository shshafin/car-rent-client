"use server";

import { envConfig } from "@/src/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: envConfig.base_Api,
});

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   function (config) {
//     const cookieStore = cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;
//     console.log(accessToken);
//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
