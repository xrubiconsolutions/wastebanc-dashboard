import axios from "axios";
import { reqInterceptor } from "../interceptor/request-interceptor";
import { resInterceptor } from "../interceptor/response-interceptor";

const RequestErrors = Object.freeze({
  UNAUTHENTICATED: {
    code: 401,
    message: "Authentication credentials were not provided.",
  },
  TOKEN_EXPIRY: {
    code: 401,
    message: "Token time out. Login again",
  },
});

export const baseURL =
  // process.env.NODE_ENV === "development"
  // ?
  // :
  // "https://packamserver.herokuapp.com/api",
  // "https://pakam-staging.herokuapp.com/api";
  //"https://wastebanc-staging.herokuapp.com/api";
  "https://wastebancapi.pakam.ng/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(reqInterceptor, (err) =>
  console.log(err)
);
//
export const axiosInstanceV2 = axios.create({
  baseURL:
    // process.env.NODE_ENV === "development"
    // ? "http://localhost:4000"
    // :
    // "https://packamserver.herokuapp.com/api",
    // "https://pakam-staging.herokuapp.com/api/v2",
    "https://wastebancapi.pakam.ng/api",
});

axiosInstance.interceptors.request.use(reqInterceptor, (err) =>
  console.log(err)
);

axiosInstance.interceptors.response.use(resInterceptor, (err) => {
  if (
    err.response?.data?.statusCode === RequestErrors.TOKEN_EXPIRY.code ||
    err.response?.status === RequestErrors.TOKEN_EXPIRY.code
  ) {
    localStorage.clear();
    window.location.reload();
  }

  return Promise.reject(err);
});

export default axiosInstance;
