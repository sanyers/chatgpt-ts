import { HttpsProxyAgent, HttpsProxyAgentOptions } from "https-proxy-agent";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {
  OPENAI_API_KEY,
  OPENAI_API_ORG,
  PROXY_OPEN,
  PROXY_HOST,
  PROXY_PORT,
} from "../env";

const proxyOpts: HttpsProxyAgentOptions = {
  host: PROXY_HOST,
  port: PROXY_PORT,
};

// 拦截请求和响应
function instances(instance: AxiosInstance) {
  // 请求拦截
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = "Bearer " + OPENAI_API_KEY;
      config.headers["OpenAI-Organization"] = OPENAI_API_ORG;
      PROXY_OPEN === "1" &&
        (config.httpsAgent = new HttpsProxyAgent(proxyOpts));
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  // instance.interceptors.response.use(
  //   (response: AxiosResponse) => {
  //     return response;
  //   },
  //   (error: AxiosError) => {
  //     if (error.response) {
  //       switch (error.response.status) {
  //         case 401:
  //           localStorage.setItem(LOGIN_CONF.KEY, "");
  //           router.push({ path: "/login" });
  //         case 500:
  //           messageErrorTime(JSON.stringify(error.response.data.msg));
  //           return {};
  //         default:
  //           messageErrorTime(JSON.stringify(error.message));
  //           return {};
  //       }
  //     }
  //   }
  // );
}

// 创建请求
const request = (config: any) => {
  const instance = axios.create(config);
  instances(instance);
  return instance;
};

export default request;
